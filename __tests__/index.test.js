import { fileURLToPath } from 'url';
import * as path from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resultingString = '{\n- follow: false\nhost: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}';

// tests for JSON files
const pathJSON1 = path.join(__dirname, '..', 'fixtures', 'jsonFile1.json');
const pathJSON2 = path.join(__dirname, '..', 'fixtures', 'jsonFile2.json');
const pathJSONWrongFile = path.join(__dirname, '..', 'fixtures', 'jsonFileWrong.json');

test('correct difference between two plain JSON', () => {
  expect(genDiff(pathJSON1, pathJSON2)).toBe(resultingString);
});

test('wrong difference between two plain JSON', () => {
  expect(genDiff(pathJSON1, pathJSONWrongFile)).not.toBe(resultingString);
});

// tests for YML files
const pathYML1 = path.join(__dirname, '..', 'fixtures', 'jsonFile1.json');
const pathYML2 = path.join(__dirname, '..', 'fixtures', 'jsonFile2.json');
const pathYMLWrongFile = path.join(__dirname, '..', 'fixtures', 'jsonFileWrong.json');

test('correct difference between two plain YML', () => {
  expect(genDiff(pathYML1, pathYML2)).toBe(resultingString);
});

test('wrong difference between two plain YML', () => {
  expect(genDiff(pathYML1, pathYMLWrongFile)).not.toBe(resultingString);
});
