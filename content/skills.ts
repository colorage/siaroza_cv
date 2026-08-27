export const skills = [
  "Visual pipelines",
  "Figma plugins",
  "Image automation",
  "Design systems",
  "Motion systems",
  "Product UI",
  "Brand systems",
  "Design ops",
  "3D production",
  "Workflow automation",
  "Prototyping",
  "Art direction",
] as const;

export type Skill = (typeof skills)[number];
