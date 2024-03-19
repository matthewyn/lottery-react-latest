import path from "path";
import solc from "solc";
import fs from "fs-extra";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildPath = path.resolve(__dirname, "build");
const lotteryPath = path.resolve(__dirname, "contracts", "Lottery.sol");

fs.removeSync(buildPath);

const source = fs.readFileSync(lotteryPath, "utf-8");

const input = {
  language: "Solidity",
  sources: {
    "Lottery.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts["Lottery.sol"];

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(path.resolve(buildPath, contract + ".json"), output[contract]);
}
