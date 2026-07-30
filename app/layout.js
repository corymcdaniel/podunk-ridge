import "./globals.css";

export const metadata = {
  title: "Podunk Ridge Colony Log",
  description: "A RimWorld colony blog, styled like it's still 2003.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
