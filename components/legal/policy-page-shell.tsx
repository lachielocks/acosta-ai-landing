import Link from "next/link";
import { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export interface PolicyMeta {
  version: string;
  effectiveDate: string;
  appliesTo: string;
}

export function PolicyMetaBlock({ meta }: { meta: PolicyMeta }) {
  return (
    <div className="space-y-1 text-sm text-muted-foreground">
      <p>
        <strong className="text-foreground">Version:</strong> {meta.version}
      </p>
      <p>
        <strong className="text-foreground">Effective date:</strong> {meta.effectiveDate}
      </p>
      <p>
        <strong className="text-foreground">Applies to:</strong> {meta.appliesTo}
      </p>
    </div>
  );
}

interface PolicyPageShellProps {
  title: string;
  summary: string;
  meta: PolicyMeta;
  children: ReactNode;
}

export function PolicyPageShell({
  title,
  summary,
  meta,
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
          <PolicyMetaBlock meta={meta} />
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
