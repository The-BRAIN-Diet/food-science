#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const files = [
  "docs/biological-targets/brs6/fm4/brs6-fm4-pm9-stress-induced-appetite-reward-drive-modulation.mdx",
  "docs/biological-targets/brs-x/hormones/fm1/brs-x-hormones-pm5-testosterone-signalling-stability.mdx",
  "docs/biological-targets/brs-x/hormones/fm1/brs-x-hormones-pm4-metabolic-reproductive-hormone-integration.mdx",
  "docs/biological-targets/brs-x/hormones/fm1/brs-x-hormones-pm1-oestrogen-signalling-stability.mdx",
  "docs/biological-targets/brs-x/ecs/fm1/brs-x-ecs-pm4-endocannabinoid-dopamine-neuromodulation.mdx",
  "docs/biological-targets/brs-x/ecs/fm1/brs-x-ecs-pm3-faah-mediated-endocannabinoid-preservation.mdx",
  "docs/biological-targets/inflammation-oxidative-stress.md",
  "docs/biological-targets/brs6/fm4/brs6-fm4-stress-inflammation-metabolic-load-allocation.mdx",
  "docs/biological-targets/brs-x/hormones/fm1/brs-x-hormones-fm1-reproductive-hormone-balance-and-neurocognitive-regulation.mdx",
  "docs/biological-targets/brs-x/ecs/fm1/brs-x-ecs-fm1-endocannabinoidome-signalling-capacity-and-neuromodulatory-regulation.mdx",
];

const replacements = [
  [
    /\/docs\/biological-targets\/brs1\/fm1\/brs1-fm1-catecholaminergic-function/g,
    "/docs/biological-targets/brs1/fm1/brs1-fm1-monoaminergic-function",
  ],
  [
    /BRS1\(FM1\) — Catecholaminergic Function \(Dopamine \+ Norepinephrine\)/g,
    "BRS1(FM1) — Monoaminergic Function",
  ],
  [
    /BRS1\(FM1\) - Catecholaminergic Function \(Dopamine \+ Norepinephrine\)/g,
    "BRS1(FM1) - Monoaminergic Function",
  ],
  [/BRS1\(FM1\) — Catecholaminergic Function/g, "BRS1(FM1) — Monoaminergic Function"],
  [/BRS1\(FM1\) - Catecholaminergic Function/g, "BRS1(FM1) - Monoaminergic Function"],
  [/Catecholaminergic default-mode/g, "Monoaminergic default-mode"],
  [/Core catecholaminergic substrate biology/g, "Core monoaminergic substrate biology"],
];

for (const rel of files) {
  const filePath = path.join(root, rel);
  let text = fs.readFileSync(filePath, "utf8");
  const before = text;
  for (const [pattern, value] of replacements) text = text.replace(pattern, value);
  if (text !== before) {
    fs.writeFileSync(filePath, text);
    console.log("updated", rel);
  }
}
