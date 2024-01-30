import { formatCheck } from "./_utils/format-check.mjs";
import { transformToMetadataCollection } from "./_utils/transform.mjs";
import { updateDatabase } from "./_utils/database.mjs";
import { readFileSync } from "fs";
import path from "path";

async function main() {
  const filePath = process.argv[2];
  console.log(`Processing ${filePath}...`);
  const source = path.join("GITHUB", filePath);
  const jsonCollection = JSON.parse(readFileSync(filePath, "utf8"));

  // ==========================
  // 1. Format check
  formatCheck(jsonCollection);

  // ==========================
  // 2. Transform
  const metadataCollection = transformToMetadataCollection(
    jsonCollection,
    source
  );

  // ==========================
  // 3. Insert into database
  const databaseURL = process.env.DATABASE_URL;
  const databaseUsername = process.env.DATABASE_USERNAME;
  const databasePassword = process.env.DATABASE_PASSWORD;

  const [insertCount, replaceCount, ignoreCount] = await updateDatabase(
    metadataCollection,
    source,
    databaseURL,
    databaseUsername,
    databasePassword
  );

  console.log("==========================");
  console.log("Update Result:");
  console.log(`Source: ${source}`);
  console.log(`Collection: ${jsonCollection.info.name}`);
  console.log(`Collection Date: ${jsonCollection.info.date}`);
  console.log("--------------------------");
  console.log(`Insert: ${insertCount}`);
  console.log(` - Replace: ${replaceCount}`);
  console.log(` - Ignore: ${ignoreCount}`);
  console.log("==========================");

  process.exit(0);
}

await main();
