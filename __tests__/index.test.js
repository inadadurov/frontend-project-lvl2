import { fileURLToPath } from 'url';
import * as path from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resultingString = '{\n- follow: false\nhost: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}';

const pathOne = path.join(__dirname, '..', 'fixtures', 'file1.json');
const pathTwo = path.join(__dirname, '..', 'fixtures', 'file2.json');

test('get difference between two plain JSON', () => {
  expect(genDiff(pathOne, pathTwo)).toBe(resultingString);
});
