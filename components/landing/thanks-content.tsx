import { Fragment, type ReactNode } from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";

type Block =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

function parseBlocks(markdown: string): Block[] {
  const blocks: Block[] = [];
  const lines = markdown.trim().split(/\r?\n/);
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) blocks.push({ type: "paragraph", text: paragraph.join(" ") });
    paragraph = [];
  };
  const flushList = () => {
    if (list.length) blocks.push({ type: "list", items: list });
    list = [];
  };

  for (const line of lines) {
    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    const item = line.match(/^\s*-\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", level: heading[1].length, text: heading[2] });
    } else if (item) {
      flushParagraph();
      list.push(item[1]);
    } else if (!line.trim()) {
      flushParagraph();
      flushList();
    } else {
      flushList();
      paragraph.push(line.trim());
    }
  }
  flushParagraph();
  flushList();
  return blocks;
}

function renderInline(text: string): ReactNode[] {
  const tokens = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return tokens.map((token, index) => {
    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a key={index} href={link[2]} target="_blank" rel="noopener noreferrer" className="link-wipe text-foreground hover:text-primary">
          {link[1]}
        </a>
      );
    }
    if (token.startsWith("**") && token.endsWith("**")) {
      return <strong key={index} className="font-semibold text-foreground">{renderInline(token.slice(2, -2))}</strong>;
    }
    if (token.startsWith("`") && token.endsWith("`")) {
      return <code key={index} className="rounded-md bg-foreground/[0.08] px-1.5 py-0.5 font-mono text-[0.9em]">{token.slice(1, -1)}</code>;
    }
    return <Fragment key={index}>{token}</Fragment>;
  });
}

export function ThanksContent() {
  const markdown = readFileSync(join(process.cwd(), "README.md"), "utf8");
  const blocks = parseBlocks(markdown);

  return (
    <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <article className="min-w-0">
          {blocks.map((block, index) => {
            if (block.type === "heading") {
              const sectionIndex = blocks.slice(0, index + 1).filter((item) => item.type === "heading").length;
              const headingText = block.text === "YOU." ? "You." : block.text;
              return (
                <header key={`heading-${index}`} className="mb-8 mt-16 border-t border-foreground/10 pt-8 first:mt-0 first:border-0 first:pt-0">
                  <p className="mb-3 font-mono text-xs tracking-[0.18em] text-muted-foreground">{String(sectionIndex).padStart(2, "0")}</p>
                  <h2 className="font-display text-3xl tracking-tight md:text-4xl">{renderInline(headingText)}</h2>
                </header>
              );
            }
            if (block.type === "list") {
              return (
                <ul key={`list-${index}`} className="my-7 space-y-4 border-l border-foreground/10 pl-5 sm:pl-7">
                  {block.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-[15px] leading-8 text-muted-foreground md:text-base">
                      {renderInline(item)}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={`paragraph-${index}`} className="my-6 max-w-[74ch] text-[15px] leading-8 text-muted-foreground md:text-base">
                {renderInline(block.text)}
              </p>
            );
          })}
        </article>
    </div>
  );
}
