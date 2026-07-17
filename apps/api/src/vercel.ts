import { handle } from "@hono/node-server/vercel";
import { createApp } from "./app.js";

export default handle(createApp());
