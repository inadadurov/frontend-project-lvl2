import { fileURLToPath } from 'url';
import * as path from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resultingString = '{\n- follow: false\nhost: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}';

const pathOne = path.join(__dirname, '..', 'fixtures', 'file1.json');
const pathTwo = path.join(__dirname, '..', 'fixtures', 'file2.json');
const pathWrongFile = path.join(__dirname, '..', 'fixtures', 'file_wrong.json');

test('correct difference between two plain JSON', () => {
  expect(genDiff(pathOne, pathTwo)).toBe(resultingString);
});

test('wrong difference between two plain JSON', () => {
  expect(genDiff(pathOne, pathWrongFile)).not.toBe(resultingString);
});
