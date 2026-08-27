"use client";

import { MediaFrame } from "@/components/MediaFrame";
import { widgets } from "@/components/widgets/registry";

type Props = {
  id?: string;
  props?: Record<string, unknown>;
};

export function WidgetEmbed({ id, props = {} }: Props) {
  if (!id) {
    return (
      <MediaFrame>
        <p className="px-6 py-10 text-center text-[14px] text-muted">
          Widget fence is missing a valid <code className="font-mono">id</code>.
        </p>
      </MediaFrame>
    );
  }

  const Widget = widgets[id];
  if (!Widget) {
    return (
      <MediaFrame>
        <p className="px-6 py-10 text-center text-[14px] text-muted">
          Widget &ldquo;{id}&rdquo; is not registered
        </p>
      </MediaFrame>
    );
  }

  return (
    <MediaFrame>
      <Widget {...props} />
    </MediaFrame>
  );
}
