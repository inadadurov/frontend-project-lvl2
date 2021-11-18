import fs from 'fs';
import { fileURLToPath } from 'url';
import * as path from 'path';
import { test, expect } from '@jest/globals';
import { makeOutputString } from '../src/makeoutput.js';
import { parseFile } from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const refStringFilePath = path.join(__dirname, '..', 'fixtures', 'CorrectDiffString_FormatStylish.txt');
const referenceString = fs.readFileSync(refStringFilePath, { encoding: 'utf8' });

const refDiffObjPath = path.join(__dirname, '..', 'fixtures', 'CorrectDiffObject.json');

test('Application of "stylish" format is correct', () => {
  const diffObj = parseFile(refDiffObjPath);
  expect(makeOutputString(diffObj, '')).toMatch(referenceString);
});
