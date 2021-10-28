import fs from 'fs';
import path from 'path';

const parseFileJSON = (filepath) => {
  const fileContent = fs.readFileSync(filepath, { encoding: 'utf8' });
  return JSON.parse(fileContent);
};

const genDiff = (filePath1, filePath2) => {
// find difference between two JSON files

  // const filePath11 = '../fixtures/file1.json';
  const filePath11 = '/home/adadurovin/frontend-project-lvl2/fixtures/file1.json';
  // const filePath22 = '../fixtures/file2.json';
  const filePath22 = '/home/adadurovin/frontend-project-lvl2/fixtures/file2.json';

  const firstJSONParsed = parseFileJSON(filePath11);
  const firstObjectKeys = Object.keys(firstJSONParsed);

  const secondJSONParsed = parseFileJSON(filePath22);
  const secondObjectKeys = Object.keys(secondJSONParsed);

  const uniqueKeysNames = Array.from(new Set([...firstObjectKeys, ...secondObjectKeys])).sort();

  const diffRecord = uniqueKeysNames.reduce((acc, key) => {
    if (key in firstJSONParsed && key in secondJSONParsed) {
      if (firstJSONParsed[key] === secondJSONParsed[key]) {
        acc[key] = firstJSONParsed[key];
        return acc;
      }
      acc[`- ${key}`] = firstJSONParsed[key];
      acc[`+ ${key}`] = secondJSONParsed[key];
      return acc;
    }

    if (key in firstJSONParsed) {
      acc[`- ${key}`] = firstJSONParsed[key];
      return acc;
    }

    if (key in secondJSONParsed) {
      acc[`+ ${key}`] = secondJSONParsed[key];
      return acc;
    }

    return acc;
  }, {});

  const diffToString = `{\n${Object.entries(diffRecord).map(([key, value]) => `${key}: ${value}`).join('\n')}\n}`;

  const c = diffToString;

  return c;
};

export default genDiff;
