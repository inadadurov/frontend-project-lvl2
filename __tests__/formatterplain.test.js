import fs from 'fs';
import { fileURLToPath } from 'url';
import * as path from 'path';
import { test, expect } from '@jest/globals';
import diffArray from '../fixtures/DiffArray.js';
import makePlainOutput from '../src/formatters/formatterplain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const refStringFilePath = path.join(__dirname, '..', 'fixtures', 'CorrectDiffString_FormatPlain.txt');
const referenceString = fs.readFileSync(refStringFilePath, { encoding: 'utf8' });

test('Application of "plain" format is correct', () => {
  expect(makePlainOutput(diffArray)).toMatch(referenceString);
});
