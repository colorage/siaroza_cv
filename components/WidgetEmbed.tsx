"use client";

import yaml from "js-yaml";
import { MediaFrame } from "@/components/MediaFrame";
import { widgets } from "@/components/widgets/registry";

type Props = {
  source: string;
};

function parseFence(source: string): { id: string; props: Record<string, unknown> } | null {
  try {
    const parsed = yaml.load(source, { schema: yaml.JSON_SCHEMA });
    if (!parsed || typeof parsed !== "object") return null;
    const data = parsed as Record<string, unknown>;
    if (typeof data.id !== "string" || !data.id) return null;
    const { id, ...props } = data;
    return { id, props };
  } catch {
    return null;
  }
}

export function WidgetEmbed({ source }: Props) {
  const parsed = parseFence(source);
  if (!parsed) {
    return (
      <MediaFrame>
        <p className="px-6 py-10 text-center text-[14px] text-muted">
          Widget fence is missing a valid <code className="font-mono">id</code>.
        </p>
      </MediaFrame>
    );
  }

  const Widget = widgets[parsed.id];
  if (!Widget) {
    return (
      <MediaFrame>
        <p className="px-6 py-10 text-center text-[14px] text-muted">
          Widget &ldquo;{parsed.id}&rdquo; is not registered
        </p>
      </MediaFrame>
    );
  }

  return (
    <MediaFrame>
      <Widget {...parsed.props} />
    </MediaFrame>
  );
}
