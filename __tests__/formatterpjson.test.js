import fs from 'fs';
import { fileURLToPath } from 'url';
import * as path from 'path';
import { test, expect } from '@jest/globals';
import makeJsonOutput from '../src/formatters/formatterjson.js';
import diffArray from '../__fixtures__/DiffArray.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const refStringFilePath = path.join(__dirname, '..', '__fixtures__', 'CorrectDiffString_FormatJSON.txt');
const referenceString = fs.readFileSync(refStringFilePath, { encoding: 'utf8' });

test('Application of "json" format is correct', () => {
  expect(JSON.stringify(makeJsonOutput(diffArray), null, 4)).toMatch(referenceString);
});
