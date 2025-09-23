export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with care by NovaCMS · Design-first, content-powered.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a
            href="https://builder.io/c/docs/projects"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            Docs
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
