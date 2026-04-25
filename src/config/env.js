import { createRequire } from "module";
const require = createRequire(import.meta.url);
const dotenv = require("dotenv");
const path = require("path");
const { fileURLToPath } = require("url");

dotenv.config({
  path: new URL(".env.dev", import.meta.url).pathname,
  override: true,
});
