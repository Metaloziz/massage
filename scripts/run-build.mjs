/**
 * Cross-platform build entrypoints:
 *   pages → GitHub Pages preview (/massage/)
 *   prod  → real host root (sasnouski.by)
 */
import { spawnSync } from "node:child_process";

const mode = process.argv[2] === "pages" ? "pages" : "prod";

const env = {
  ...process.env,
  SITE_URL:
    mode === "pages"
      ? "https://metaloziz.github.io/massage"
      : "https://sasnouski.by",
  BASE_PATH: mode === "pages" ? "/massage" : "",
};

console.log(
  `[build] mode=${mode} SITE_URL=${env.SITE_URL} BASE_PATH=${env.BASE_PATH || "(empty)"}`,
);

const result = spawnSync("npm", ["run", "build"], {
  env,
  stdio: "inherit",
  shell: true,
});

process.exit(result.status ?? 1);
