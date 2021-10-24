import fs from 'fs';
import path from 'path';

const genDiff = (filePath1, filePath2) => {
// find difference between two JSON files

  // const filePath11 = '../__tests__/fixtures/file1.json';
  const filePath11 = '/home/adadurovin/frontend-project-lvl2/__tests__/fixtures/file1.json';
  // const filePath22 = '../__tests__/fixtures/file2.json';
  const filePath22 = '/home/adadurovin/frontend-project-lvl2/__tests__/fixtures/file2.json';

  const firstFileContent = fs.readFileSync(filePath11, { encoding: 'utf8' });
  const firstJSONParsed = JSON.parse(firstFileContent);
  const firstObjectKeys = Object.keys(firstJSONParsed);

  const secondFileContent = fs.readFileSync(filePath22, { encoding: 'utf8' });
  const secondJSONParsed = JSON.parse(secondFileContent);
  const secondObjectKeys = Object.keys(secondJSONParsed);

  const uniqueKeysNames = Array.from(new Set([...firstObjectKeys, ...secondObjectKeys])).sort();

  const diffRecord = uniqueKeysNames.reduce((acc, key) => {
    if (key in firstJSONParsed && key in secondJSONParsed) {
      if (firstJSONParsed[key] === secondJSONParsed[key]) {
        acc[key] = firstJSONParsed[key];
        // console.log(acc);
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
