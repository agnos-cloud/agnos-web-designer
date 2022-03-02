// Note that this file requires node@13.2.0 or higher (or the --experimental-modules flag)
import fs from "fs";
import path from "path";

const importMapFilePath = path.resolve(process.cwd(), "importmap.json");
const importMap = JSON.parse(fs.readFileSync(importMapFilePath, { encoding:'utf8', flag:'r' }));

// *********************** put appropriate module name and url here
const moduleName = "@agnos/agnos-web-designer";
const url = "https://agnos-heroku-code-deploy.s3.amazonaws.com/agnos-web-designer/agnos-agnos-web-designer.js";
importMap.imports[moduleName] = url;

fs.writeFileSync(importMapFilePath, JSON.stringify(importMap, null, 2));

console.log(`Updated import map for module ${moduleName}.`);
