// Local development MongoDB via mongodb-memory-server — no Docker required.
// Runs on a fixed port with a persistent dbPath so data survives restarts and
// matches DATABASE_URI in .env. Run alongside `pnpm dev` in a separate terminal.
import { mkdirSync } from "node:fs";
import { MongoMemoryServer } from "mongodb-memory-server";

const dbPath = "./.mongo-data";
mkdirSync(dbPath, { recursive: true });

const server = await MongoMemoryServer.create({
  instance: {
    port: 27017,
    dbName: "aadhya",
    dbPath,
    storageEngine: "wiredTiger",
  },
});

console.info(`\n  ✔ MongoDB (in-memory) ready → ${server.getUri()}aadhya`);
console.info("  Leave this running while you develop. Press Ctrl+C to stop.\n");

const shutdown = async () => {
  await server.stop();
  process.exit(0);
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// Keep the process alive.
await new Promise(() => {});
