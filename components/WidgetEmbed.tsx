"use client";

import { MediaFrame } from "@/components/MediaFrame";
import { widgets } from "@/components/widgets/registry";
import type { Locale } from "@/lib/i18n";

type Props = {
  id?: string;
  locale: Locale;
  props?: Record<string, unknown>;
};

export function WidgetEmbed({ id, locale, props = {} }: Props) {
  if (!id) {
    return (
      <MediaFrame className="my-6 bg-card">
        <p className="px-6 py-10 text-center text-[14px] text-muted">
          Widget fence is missing a valid <code className="font-mono">id</code>.
        </p>
      </MediaFrame>
    );
  }

  const Widget = widgets[id];
  if (!Widget) {
    return (
      <MediaFrame className="my-6 bg-card">
        <p className="px-6 py-10 text-center text-[14px] text-muted">
          Widget &ldquo;{id}&rdquo; is not registered
        </p>
      </MediaFrame>
    );
  }

  return <Widget {...props} locale={locale} />;
}
