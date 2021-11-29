import _ from 'lodash';
import { parseFile } from './src/parsers.js';
import makePlainOutput from './formatters/formatterplain.js';
import makeFStylishOutput from './formatters/formatterfstylish.js';

const makeDiffRecord = (objectOne, objectTwo) => {
  const firstObjectKeys = Object.keys(objectOne);
  const secondObjectKeys = Object.keys(objectTwo);

  const uniqueKeysNames = Array.from(new Set([...firstObjectKeys, ...secondObjectKeys])).sort();

  const diffRecord = uniqueKeysNames.reduce((acc, key) => {
    const objOneKeyValIsObject = _.isObject(objectOne[key]);
    const objTwoKeyValIsObject = _.isObject(objectTwo[key]);

    if (key in objectOne && key in objectTwo) {
      if (objOneKeyValIsObject && objTwoKeyValIsObject) {
        acc[key] = makeDiffRecord(objectOne[key], objectTwo[key]);
      } else if (!objOneKeyValIsObject || !objTwoKeyValIsObject) {
        if (objectOne[key] === objectTwo[key]) {
          acc[key] = objectOne[key];
        } else {
          acc[`- ${key}`] = objectOne[key];
          acc[`+ ${key}`] = objectTwo[key];
        }
      }
    } else if (key in objectOne && !(key in objectTwo)) {
      acc[`- ${key}`] = objectOne[key];
    } else acc[`+ ${key}`] = objectTwo[key];

    return acc;
  }, {});

  return diffRecord;
};

const genDiff = (firstFilePath, secondFilePath, formatName) => {
  const firstFileParsed = parseFile(firstFilePath);
  const secondFileParsed = parseFile(secondFilePath);

  const differenceObject = makeDiffRecord(firstFileParsed, secondFileParsed);

  if (formatName === 'plain') return makePlainOutput(differenceObject);
  return makeFStylishOutput(differenceObject);
};

export { genDiff, makeDiffRecord };
