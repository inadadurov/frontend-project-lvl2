import { parseFile } from './src/parsers.js';
import makePlainOutput from './src/formatters/formatterplain.js';
import makeFStylishOutput from './src/formatters/formatterfstylish.js';
import makeJsonOutput from './src/formatters/formatterjson.js';
import makeDiffRecord from './src/diffrecord.js';

const genDiff = (firstFilePath, secondFilePath, formatName) => {
  const firstFileParsed = parseFile(firstFilePath);
  const secondFileParsed = parseFile(secondFilePath);

  const difference = makeDiffRecord(firstFileParsed, secondFileParsed);

  if (formatName === 'plain') return makePlainOutput(difference);
  if (formatName === 'json') return JSON.stringify(makeJsonOutput(difference), null, 4);
  return makeFStylishOutput(difference);
};

export default genDiff;
