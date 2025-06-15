import path from "path";
const __dirname = path.resolve();
import { readFile, writeFile } from "fs/promises";

export const readData = async (filename) => {
  return readFile(`${__dirname}/data/${filename}.json`);
};

export const writeData = async (filename, data) => {
  return await writeFile(
    `${__dirname}/data/${filename}.json`,
    JSON.stringify(data, null, 2)
  );
};
