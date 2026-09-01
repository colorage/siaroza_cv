import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const VAULT_DIR = path.join(
  process.cwd(),
  "content/vault/case-studies/figma-plugin/widget/vault",
);
const GRAPH_SETTINGS_PATH = path.join(VAULT_DIR, ".obsidian/graph.json");
const OUTPUT_PATH = path.join(
  process.cwd(),
  "components/widgets/obsidian-graph/graph-data.json",
);

type GraphSettings = {
  centerStrength?: number;
  repelStrength?: number;
  linkStrength?: number;
  linkDistance?: number;
  nodeSizeMultiplier?: number;
  lineSizeMultiplier?: number;
  textFadeMultiplier?: number;
  showArrow?: boolean;
  showOrphans?: boolean;
  hideUnresolved?: boolean;
};

type GraphNode = {
  id: string;
  label: string;
  resolved: boolean;
  body: string;
  links: string[];
  degree: number;
  size: number;
};

type GraphLink = {
  source: string;
  target: string;
};

type GraphData = {
  settings: GraphSettings;
  nodes: GraphNode[];
  links: GraphLink[];
};

function parseWikilinks(body: string): string[] {
  const links: string[] = [];
  const re = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(body)) !== null) {
    const target = match[1]?.trim();
    if (target) links.push(target);
  }
  return links;
}

function loadSettings(): GraphSettings {
  if (!existsSync(GRAPH_SETTINGS_PATH)) return {};
  return JSON.parse(readFileSync(GRAPH_SETTINGS_PATH, "utf8")) as GraphSettings;
}

function buildGraph(): GraphData {
  const settings = loadSettings();
  const files = readdirSync(VAULT_DIR).filter((name) => name.endsWith(".md"));
  const resolved = new Set(files.map((name) => name.slice(0, -3)));

  const noteBodies = new Map<string, { body: string; links: string[] }>();
  const edges: GraphLink[] = [];

  for (const file of files) {
    const id = file.slice(0, -3);
    const raw = readFileSync(path.join(VAULT_DIR, file), "utf8");
    const links = parseWikilinks(raw);
    noteBodies.set(id, { body: raw.trim(), links });
    for (const target of links) {
      edges.push({ source: id, target });
    }
  }

  const nodeIds = new Set<string>(resolved);
  for (const edge of edges) {
    nodeIds.add(edge.target);
  }

  const degree = new Map<string, number>();
  for (const id of nodeIds) degree.set(id, 0);
  for (const edge of edges) {
    degree.set(edge.source, (degree.get(edge.source) ?? 0) + 1);
    degree.set(edge.target, (degree.get(edge.target) ?? 0) + 1);
  }

  const maxDegree = Math.max(1, ...degree.values());
  const sizeMultiplier = settings.nodeSizeMultiplier ?? 1;

  const nodes: GraphNode[] = [...nodeIds].sort((a, b) => a.localeCompare(b)).map((id) => {
    const note = noteBodies.get(id);
    const deg = degree.get(id) ?? 0;
    const normalized = Math.sqrt(deg / maxDegree);
    const size = (4 + normalized * 8) * sizeMultiplier;
    return {
      id,
      label: id,
      resolved: resolved.has(id),
      body: note?.body ?? "",
      links: note?.links ?? [],
      degree: deg,
      size,
    };
  });

  return { settings, nodes, links: edges };
}

function main() {
  const data = buildGraph();
  writeFileSync(OUTPUT_PATH, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log(
    `Wrote ${data.nodes.length} nodes, ${data.links.length} links → ${OUTPUT_PATH}`,
  );
}

main();
