import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface Post { id: number; title: string; slug: string; content: string }

export default function Index() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    try {
      const local = JSON.parse(localStorage.getItem("novacms.posts") || "[]");
      setPosts(local);
    } catch (_) {}
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_50%_-200px,theme(colors.indigo.200)/50%,transparent)] dark:bg-[radial-gradient(1200px_600px_at_50%_-200px,theme(colors.indigo.800)/30%,transparent)]" />
        <div className="container py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
              Build your own CMS · Modern, scalable, beautiful
            </div>
            <h1 className="mt-6 text-balance bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-6xl">
              A content platform that merges creativity with technology
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Design intuitive interfaces, craft engaging layouts, and publish effortlessly. NovaCMS is your playground to master full‑stack development while shipping a real product.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link to="/write">Start writing</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#features">Explore features</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="container grid gap-6 py-10 md:grid-cols-3 md:py-16">
        <Card>
          <CardHeader>
            <CardTitle>Design‑first editing</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Create and format content with a simple markdown editor and live preview. Focus on writing while the layout stays beautiful.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Publish effortlessly</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Draft, preview, and publish in seconds. Save locally now—wire up a real database later when you're ready to scale.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Built to scale</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Architected for growth into a multi‑user platform or full business website as your vision expands.
          </CardContent>
        </Card>
      </section>

      <section className="container py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Recent drafts</h2>
          <Button asChild variant="link">
            <Link to="/write">Open editor</Link>
          </Button>
        </div>
        {posts.length === 0 ? (
          <div className="rounded-lg border p-8 text-center text-muted-foreground">
            No drafts yet. Start by creating your first post.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 6).map((p) => (
              <Card key={p.id}>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{p.title || "Untitled"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-sm text-muted-foreground">{p.content.replace(/[#*_`\[\]]/g, "").slice(0, 160)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
