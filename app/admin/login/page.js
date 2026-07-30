import { Suspense } from "react";
import { AdminLoginForm } from "@/components/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div>
      <h2 style={{ fontFamily: '"Courier New", monospace', color: "#f2e0b8" }}>Log in</h2>
      <Suspense fallback={null}>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
