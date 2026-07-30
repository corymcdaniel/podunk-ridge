// Simple single-password admin auth. No user accounts, no third-party auth
// provider - just a shared password (set as the ADMIN_PASSWORD env var) and
// a signed, httpOnly session cookie. Uses Web Crypto (crypto.subtle) rather
// than Node's `crypto` module so the same code works in both Route Handlers
// (Node runtime) and middleware (Edge runtime).

export const SESSION_COOKIE = "pr_admin_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

async function sign(payload, secret) {
  const enc = new TextEncoder();
  const data = enc.encode(`${payload}:${secret}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function getSecret() {
  // Falls back to a dev-only secret so local dev works before you've set
  // ADMIN_PASSWORD. Always set ADMIN_PASSWORD for real deploys.
  return process.env.ADMIN_PASSWORD || "dev-only-insecure-secret";
}

export function checkPassword(password) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false; // refuse to "succeed" if nothing is configured
  return typeof password === "string" && password.length > 0 && password === expected;
}

export async function createSessionToken() {
  const secret = getSecret();
  const payload = String(Date.now());
  const sig = await sign(payload, secret);
  return `${payload}.${sig}`;
}

export async function verifySessionToken(token) {
  if (!token || typeof token !== "string") return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const secret = getSecret();
  const expected = await sign(payload, secret);
  if (expected !== sig) return false;
  const age = Date.now() - Number(payload);
  if (!Number.isFinite(age) || age < 0 || age > SESSION_MAX_AGE_SECONDS * 1000) return false;
  return true;
}

// For use inside Route Handlers (request is a NextRequest, which exposes .cookies)
export async function requireAdmin(request) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}
