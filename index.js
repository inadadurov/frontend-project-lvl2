import { parseFile } from './src/parsers.js';

const genDiff = (firstFilePath, secondFilePath) => {
// find difference between two JSON files

  const firstFileParsed = parseFile(firstFilePath);
  const firstObjectKeys = Object.keys(firstFileParsed);
  // console.log(firstFileParsed);

  const secondFileParsed = parseFile(secondFilePath);
  const secondObjectKeys = Object.keys(secondFileParsed);
  // console.log(secondFileParsed);

  const uniqueKeysNames = Array.from(new Set([...firstObjectKeys, ...secondObjectKeys])).sort();

  const diffRecord = uniqueKeysNames.reduce((acc, key) => {
    if (key in firstFileParsed && key in secondFileParsed) {
      if (firstFileParsed[key] === secondFileParsed[key]) {
        acc[key] = firstFileParsed[key];
        return acc;
      }
      acc[`- ${key}`] = firstFileParsed[key];
      acc[`+ ${key}`] = secondFileParsed[key];
      return acc;
    }

    if (key in firstFileParsed) {
      acc[`- ${key}`] = firstFileParsed[key];
      return acc;
    }

    if (key in secondFileParsed) {
      acc[`+ ${key}`] = secondFileParsed[key];
      return acc;
    }

    return acc;
  }, {});

  const diffToString = `{\n${Object.entries(diffRecord).map(([key, value]) => `${key}: ${value}`).join('\n')}\n}`;

  const c = diffToString;

  return c;
};

export default genDiff;
