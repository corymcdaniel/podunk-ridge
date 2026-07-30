import Link from "next/link";
import { LogoutButton } from "@/components/LogoutButton";

export default function AdminLayout({ children }) {
  return (
    <div className="pr-shell" style={{ marginTop: 20 }}>
      <div className="pr-banner">
        <h1 style={{ fontSize: 28 }}>
          <span className="pr-sparkle">&#9881;</span> ADMIN &mdash; PODUNK RIDGE
        </h1>
      </div>
      <table className="pr-navtable">
        <tbody>
          <tr>
            <td><Link href="/admin">Dashboard</Link></td>
            <td><Link href="/admin/posts">Posts</Link></td>
            <td><Link href="/admin/colonists">Colonists</Link></td>
            <td><Link href="/admin/guestbook">Guestbook</Link></td>
            <td><Link href="/admin/vitals">Colony Vitals</Link></td>
            <td><Link href="/">&larr; View site</Link></td>
            <td><LogoutButton /></td>
          </tr>
        </tbody>
      </table>
      <div className="pr-content" style={{ padding: 20 }}>
        {children}
      </div>
    </div>
  );
}
