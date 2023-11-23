// migrate.js
const pgMigrate = require("node-pg-migrate");

const runMigration = async () => {
  try {
    await pgMigrate({
      databaseUrl: "postgres://postgres:postgres@postgres:5432/postgres",
      dir: "./migrations", // Adjust this path based on your project structure
    });
    console.log("Migration successful!");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};

runMigration();
