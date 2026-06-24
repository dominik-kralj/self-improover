import "dotenv/config";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { sql } from "drizzle-orm";
import { db } from "./db.js";

const app = new Hono();

app.get("/health", async (c) => {
  try {
    await db.execute(sql`SELECT 1`);
    return c.json({ status: "ok" });
  } catch {
    return c.json({ status: "db_error" }, 500);
  }
});

serve({ fetch: app.fetch, port: 3000 });
