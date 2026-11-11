import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(resolve(root, path), "utf8");

test("Sağlık yanıtı kişisel öğrenci numarasını içerir", () => {
  assert.match(read("src/app.js"), /2416501081/);
  assert.match(read("src/app.js"), /\/health/);
});

test("Doğru 5 kaynak dosyası ayrı tutulur", () => {
  for (const path of ["src/app.js","src/server.js","src/data/events.js","src/routes/event-routes.js","src/controllers/event-controller.js"]) {
    assert.ok(existsSync(resolve(root,path)), `${path} eksik`);
  }
});

test(".env ve node_modules gitignore içinde", () => {
  const ignore=read(".gitignore");
  assert.match(ignore, /^\.env$/m);
  assert.match(ignore, /^node_modules\/$/m);
  assert.equal(read(".env.example").trim(), "PORT=3000");
});

test("Postman collection 6 doğru istek içeriyor", () => {
  const c=JSON.parse(read("requests/kampus-api.json"));
  assert.equal(c.item.length,6);
  assert.deepEqual(c.item.map((i)=>i.request.method),["GET","GET","GET","GET","POST","POST"]);
  assert.deepEqual(c.item.map((i)=>i.request.url.raw.replace("{{baseUrl}}","")),
    ["/health","/events","/events/event-2","/events/yok","/events","/events"]);
});
