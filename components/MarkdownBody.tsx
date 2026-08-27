import {
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MediaFrame } from "@/components/MediaFrame";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import { WidgetEmbed } from "@/components/WidgetEmbed";
import { parseWidgetFence } from "@/lib/vault/markdown";

type Props = {
  markdown: string;
};

function languageOf(node: ReactNode): { lang?: string; text: string } | null {
  const child = Array.isArray(node) ? node[0] : node;
  if (!isValidElement(child)) return null;
  const element = child as ReactElement<{
    className?: string;
    children?: ReactNode;
  }>;
  const lang = /language-(\w+)/.exec(element.props.className ?? "")?.[1];
  const text = String(element.props.children ?? "").replace(/\n$/, "");
  return { lang, text };
}

export function MarkdownBody({ markdown }: Props) {
  if (!markdown.trim()) return null;

  return (
    <div className="max-w-2xl [&_a]:text-foreground [&_a]:underline-offset-4 [&_a]:hover:opacity-70">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="mt-14 mb-4 font-mono text-[11px] tracking-wide text-muted uppercase">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 mb-3 text-[18px] tracking-tight text-foreground">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-4 text-[16px] leading-relaxed text-muted last:mb-0">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="mb-4 space-y-2 last:mb-0 [&_li]:before:mr-2 [&_li]:before:text-border-strong [&_li]:before:content-['–']">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 list-decimal space-y-3 pl-5 text-[16px] leading-relaxed text-muted last:mb-0">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-[16px] leading-relaxed text-muted">{children}</li>
          ),
          img: ({ src, alt }) =>
            src ? (
              <MediaFrame className="my-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={alt ?? ""} className="h-auto w-full" />
              </MediaFrame>
            ) : null,
          pre: ({ children }) => {
            const code = languageOf(children);
            if (code?.lang === "mermaid") {
              return <MermaidDiagram chart={code.text} />;
            }
            if (code?.lang === "widget") {
              const parsed = parseWidgetFence(code.text);
              return (
                <WidgetEmbed id={parsed?.id} props={parsed?.props} />
              );
            }
            return (
              <pre className="mb-4 overflow-x-auto rounded-2xl border border-border bg-surface p-4 font-mono text-[13px] text-muted last:mb-0">
                {children}
              </pre>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
