// import _ from 'lodash';
import { genDiff } from './index.js';
// import makeFStylishOutput from './formatters/formatterfstylish.js';
import makePlainOutput from './src/formatters/formatterplain.js';

const path1 = '/home/adadurovin/frontend-project-lvl2/fixtures/jsonFile1.json';
const path2 = '/home/adadurovin/frontend-project-lvl2/fixtures/jsonFile2.json';

const diff = genDiff(path1, path2, 'plain');

console.log(makePlainOutput(diff));

/*
const obj = {
  k1: true,
  k2: false,
};

console.log(_.assignIn(obj, { k1: null, key3: undefined }));
*/
