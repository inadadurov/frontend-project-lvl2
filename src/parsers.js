// files parsin functionality

import fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

const getFileFormat = (filepath) => path.extname(filepath);

const parseFile = (filepath) => {
  const fileFormat = getFileFormat(filepath);

  const fileContent = fs.readFileSync(filepath, { encoding: 'utf8' });

  if (fileFormat === '.json') return JSON.parse(fileContent);
  if (fileFormat === '.yml' || fileFormat === '.yaml') return yaml.load(fileContent);

  return 'wrong file format';
};

export { parseFile, getFileFormat };
