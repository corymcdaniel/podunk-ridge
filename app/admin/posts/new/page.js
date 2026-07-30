import { PostForm } from "@/components/PostForm";

export default function NewPostPage() {
  return (
    <div>
      <h2 style={{ fontFamily: '"Courier New", monospace', color: "#f2e0b8" }}>New Entry</h2>
      <PostForm mode="create" />
    </div>
  );
}
