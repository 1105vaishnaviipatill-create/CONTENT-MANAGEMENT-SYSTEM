import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function escapeHtml(str: string) {
  return str.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c] as string));
}

function markdownToHtml(src: string) {
  let html = escapeHtml(src);
  html = html.replace(/^### (.*)$/gim, "<h3>$1</h3>");
  html = html.replace(/^## (.*)$/gim, "<h2>$1</h2>");
  html = html.replace(/^# (.*)$/gim, "<h1>$1</h1>");
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\[(.*?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline">$1<\/a>');
  html = html
    .split(/\n\n+/)
    .map((block) => (/^<h[1-3]>/.test(block) ? block : `<p>${block.replace(/\n/g, "<br/>")}<\/p>`))
    .join("\n");
  return html;
}

export default function Write() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("# Start writing\n\nWrite your blog post using simple markdown.\n\n**Bold**, *italic*, `code` and [links](https://example.com).");

  useEffect(() => {
    setSlug(slugify(title));
  }, [title]);

  const preview = useMemo(() => markdownToHtml(content), [content]);

  function handleSave() {
    const post = { id: Date.now(), title, slug, content };
    const existing = JSON.parse(localStorage.getItem("novacms.posts") || "[]");
    localStorage.setItem("novacms.posts", JSON.stringify([post, ...existing]));
  }

  return (
    <div className="container py-10">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Write a new post</h1>
          <p className="text-muted-foreground">Create, preview, and publish content with ease.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => setContent("")}>Clear</Button>
          <Button onClick={handleSave}>Save draft</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Editor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
            <Textarea
              className="min-h-[420px] font-mono"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <article className="prose prose-slate max-w-none dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: preview }} />
            </article>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
