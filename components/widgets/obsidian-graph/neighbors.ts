import type { GraphLink } from "@/components/widgets/obsidian-graph/types";

export function buildNeighborMap(links: GraphLink[]): Map<string, Set<string>> {
  const map = new Map<string, Set<string>>();
  const touch = (id: string, neighbor: string) => {
    if (!map.has(id)) map.set(id, new Set());
    map.get(id)!.add(neighbor);
  };
  for (const link of links) {
    touch(link.source, link.target);
    touch(link.target, link.source);
  }
  return map;
}

export function highlightSet(
  nodeId: string | null,
  neighbors: Map<string, Set<string>>,
): Set<string> | null {
  if (!nodeId) return null;
  const set = new Set<string>([nodeId]);
  for (const neighbor of neighbors.get(nodeId) ?? []) set.add(neighbor);
  return set;
}
