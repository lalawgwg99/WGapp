import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("pricing data is centralized and contains the current area fees", async () => {
  const [page, pricing] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/pricing-data.ts", root), "utf8"),
  ]);

  assert.match(page, /from "\.\/pricing-data"/);
  assert.doesNotMatch(page, /const products: FeeItem\[\]/);
  assert.match(pricing, /"100": \{ price: 100, places: "楠梓、旗津" \}/);
  assert.match(pricing, /"200": \{ price: 200, places: "橋頭、林園/);
  assert.match(pricing, /"1500": \{ price: 1500, places: "三民、桃源、茂林、霧台、枋山、牡丹、車城、恆春" \}/);
  assert.match(pricing, /"2000": \{ price: 2000, places: "滿洲" \}/);
});

test("calculator exposes copyable estimates and quote-only warnings", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");

  assert.match(page, /navigator\.clipboard\.writeText/);
  assert.match(page, /複製報價明細/);
  assert.match(page, /另議項目未計入合計/);
  assert.match(page, /已知費用合計/);
  assert.match(page, /點此加入另議清單/);
});

test("mobile controls and typography have responsive safeguards", async () => {
  const css = await readFile(new URL("app/globals.css", root), "utf8");

  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /\.hero h1 \{[^}]*clamp\(/s);
  assert.match(css, /\.section-heading h2, \.area-intro h2 \{[^}]*overflow-wrap: anywhere/s);
  assert.match(css, /\.mini-stepper button \{ width: 40px; height: 40px; \}/);
  assert.match(css, /\.filter \{ min-height: 44px/);
  assert.match(css, /\.estimate-actions button \{ min-height: 50px; \}/);
});
