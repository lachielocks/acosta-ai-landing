import Link from "next/link";
import { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

interface PolicyPageShellProps {
  title: string;
  lastUpdated: string;
  summary: string;
  children: ReactNode;
}

export function PolicyPageShell({
  title,
  lastUpdated,
  summary,
  children,
}: PolicyPageShellProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <Link href="/policies" className="link-wipe link-wipe-flex text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Trust Centre
        </Link>

        <header className="mt-6 mb-10 space-y-4">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
          <h1 className="text-4xl md:text-6xl font-display tracking-tight">{title}</h1>
          <p className="max-w-3xl text-lg text-muted-foreground leading-relaxed italic">"{summary}"</p>
        </header>

        <div className="space-y-8">{children}</div>

        <footer className="mt-16 border-t border-foreground/10 pt-8 text-sm text-muted-foreground space-y-1">
          <p>
            Acosta AI is a{" "}
            <a
              href="https://transnology.co"
              target="_blank"
              rel="noreferrer"
              className="link-wipe link-wipe-flex"
            >
              Transnology
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>{" "}
            company.
          </p>
          <p>Trading as Lachlan Thurlow (ABN 59 312 943 638).</p>
        </footer>
      </div>
    </main>
  );
}
