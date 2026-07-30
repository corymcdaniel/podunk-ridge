import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div>
      <h2 style={{ fontFamily: '"Courier New", monospace', color: "#f2e0b8" }}>Dashboard</h2>
      <p>Welcome back to the ranch office. What do you need to do?</p>
      <ul style={{ lineHeight: 2 }}>
        <li><Link href="/admin/posts/new">Write a new colony log entry</Link></li>
        <li><Link href="/admin/posts">Edit or delete existing entries</Link></li>
        <li><Link href="/admin/colonists">Update the colonist roster</Link></li>
        <li><Link href="/admin/guestbook">Moderate the guestbook</Link></li>
        <li><Link href="/admin/vitals">Update colony vitals (the ticker text)</Link></li>
      </ul>
    </div>
  );
}
