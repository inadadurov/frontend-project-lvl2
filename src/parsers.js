// files parsin functionality

import fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

const getFileFormat = (filepath) => path.extname(filepath);

const parseFile = (filepath) => {
  const fileFormat = getFileFormat(filepath);

  const fileContent = fs.readFileSync(filepath, { encoding: 'utf8' });

  let parsedData;
  if (fileFormat === '.json') {
    parsedData = JSON.parse(fileContent);
  } else if (fileFormat === '.yml' || fileFormat === '.yaml') {
    parsedData = yaml.load(fileContent);
  }

  return parsedData;
};

export { parseFile, getFileFormat };
