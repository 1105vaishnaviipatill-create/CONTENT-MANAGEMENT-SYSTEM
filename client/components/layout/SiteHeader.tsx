import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/write", label: "Write" },
];

export function SiteHeader() {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="group inline-flex items-center gap-2">
          <span className="relative grid size-7 place-items-center rounded-md bg-gradient-to-br from-primary to-indigo-500 text-white">
            <span className="absolute inset-0 rounded-md ring-1 ring-black/10" />
            <svg viewBox="0 0 24 24" className="size-4">
              <path d="M4 12h8m0 0V4m0 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="font-semibold tracking-tight">
            NovaCMS
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "text-sm text-muted-foreground transition-colors hover:text-foreground",
                pathname === item.href && "text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="default" size="sm">
            <Link to="/write">Start writing</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
