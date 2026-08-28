import type { ComponentType } from "react";
import { ThumbnailPipeline } from "@/components/widgets/ThumbnailPipeline";

export type VaultWidgetProps = Record<string, unknown>;

export const widgets: Record<string, ComponentType<VaultWidgetProps>> = {
  "thumbnail-pipeline": ThumbnailPipeline,
};
