import fs from 'fs';
import { fileURLToPath } from 'url';
import * as path from 'path';
import { test, expect } from '@jest/globals';
import { makeOutputString, setFormat } from '../src/makeoutput.js';
import { fStylish, otherFormat } from '../src/formatsdescription.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const refStringFilePath = path.join(__dirname, '..', 'fixtures', 'CorrectDiffString_FormatStylish.txt');
const referenceString = fs.readFileSync(refStringFilePath, { encoding: 'utf8' });;

test('set output format with undefined format', () => {
  expect(setFormat('')).toMatchObject(fStylish);
});

test('set output format with format "otherFormat"', () => {
  expect(setFormat('otherFormat')).toMatchObject(otherFormat);
});