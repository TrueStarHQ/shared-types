#!/usr/bin/env node

const https = require("https");
const fs = require("fs");
const path = require("path");

const OPENAPI_URL =
  "https://raw.githubusercontent.com/truestarhq/api/main/public/openapi.yaml";
const OUTPUT_PATH = path.join(__dirname, "..", "openapi.yaml");

console.log(`Fetching OpenAPI spec from: ${OPENAPI_URL}`);

https
  .get(OPENAPI_URL, (res) => {
    if (res.statusCode !== 200) {
      console.error(`Failed to fetch OpenAPI spec: ${res.statusCode}`);
      process.exit(1);
    }

    const writeStream = fs.createWriteStream(OUTPUT_PATH);
    res.pipe(writeStream);

    writeStream.on("finish", () => {
      console.log(`OpenAPI spec saved to: ${OUTPUT_PATH}`);
    });

    writeStream.on("error", (err) => {
      console.error("Error writing file:", err);
      process.exit(1);
    });
  })
  .on("error", (err) => {
    console.error("Error fetching OpenAPI spec:", err);
    process.exit(1);
  });
