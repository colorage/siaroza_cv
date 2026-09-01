export type GraphSettings = {
  centerStrength?: number;
  repelStrength?: number;
  linkStrength?: number;
  linkDistance?: number;
  nodeSizeMultiplier?: number;
  lineSizeMultiplier?: number;
  textFadeMultiplier?: number;
  showArrow?: boolean;
  scale?: number;
};

export type GraphNode = {
  id: string;
  label: string;
  resolved: boolean;
  body: string;
  links: string[];
  degree: number;
  size: number;
};

export type GraphLink = {
  source: string;
  target: string;
};

export type GraphData = {
  settings: GraphSettings;
  nodes: GraphNode[];
  links: GraphLink[];
};

export type SimNode = GraphNode & {
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
};

export type SimLink = {
  source: string | SimNode;
  target: string | SimNode;
};

export type GraphColors = {
  background: string;
  foreground: string;
  stroke: string;
  accent: string;
  surface: string;
};
