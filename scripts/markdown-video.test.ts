import assert from "node:assert/strict";
import test from "node:test";
import path from "node:path";
import { parseVideoFence, preprocessMarkdown } from "../lib/vault/markdown";

const noteDir = path.join(process.cwd(), "content/vault/case-studies");

test("video paths resolve from a vault note and retain localized copy", () => {
  const output = preprocessMarkdown('```video\nsrc: shutter-detector/demo.mp4\nposter: shutter-detector/demo-poster.jpg\ntitle: Выяўленне аканіц\ncaption: Webcam demonstration\n```', noteDir);
  const parsed = parseVideoFence(output.replace(/^```video\n|```$/g, ""));
  assert.deepEqual(parsed, {
    src: "/media/case-studies/shutter-detector/demo.mp4",
    poster: "/media/case-studies/shutter-detector/demo-poster.jpg",
    title: "Выяўленне аканіц",
    caption: "Webcam demonstration",
  });
});

test("invalid video metadata does not render an unnamed or remote player", () => {
  for (const source of ['[', 'src: /media/demo.mp4', 'src: https://example.com/demo.mp4\ntitle: Demo', 'src: /media/demo.mp4\ntitle: ""']) {
    assert.equal(parseVideoFence(source), null);
  }
});

test("existing gallery fences keep their path rewriting", () => {
  assert.equal(preprocessMarkdown('```gallery\n- src: demo.jpg\n  alt: Demo\n```', noteDir), '```gallery\n- src: /media/case-studies/demo.jpg\n  alt: Demo\n```');
});
