import type { ComponentType } from "react";

export type VaultWidgetProps = Record<string, unknown>;

export const widgets: Record<string, ComponentType<VaultWidgetProps>> = {
  // First-use: register a client component here, then drop a ```widget fence in the note.
};
