import fs from 'fs';
import { fileURLToPath } from 'url';
import * as path from 'path';
import { test, expect } from '@jest/globals';
import { parseFile } from '../src/parsers.js';
import makePlainOutput from '../formatters/formatterplain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const refStringFilePath = path.join(__dirname, '..', 'fixtures', 'CorrectDiffString_FormatPlain.txt');
const referenceString = fs.readFileSync(refStringFilePath, { encoding: 'utf8' });

const refDiffObjPath = path.join(__dirname, '..', 'fixtures', 'CorrectDiffObject.json');

test('Application of "plain" format is correct', () => {
  const diffObj = parseFile(refDiffObjPath);
  expect(makePlainOutput(diffObj, '')).toMatch(referenceString);
});
