import { fileURLToPath } from 'url';
import * as path from 'path';
import { test, expect } from '@jest/globals';
import * as parsers from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathOne = path.join(__dirname, '..', 'fixtures', 'ymlFile1.yml');
const pathTwo = path.join(__dirname, '..', 'fixtures', 'jsonFile1.json');

// Tests file extensions identified right
test('correct YML file format detection', () => {
  expect(parsers.getFileFormat(pathOne)).toBe('.yml');
  expect(parsers.getFileFormat(pathOne)).not.toBe('yml');
});

test('correct JSON file format detection', () => {
  expect(parsers.getFileFormat(pathTwo)).toBe('.json');
  expect(parsers.getFileFormat(pathTwo)).not.toBe('json');
});

// Tests for parsing results
const templateFileOneParsed = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};
test('JSON file parsed correctly', () => {
  expect(parsers.parseFile(pathTwo)).toMatchObject(templateFileOneParsed);
});

test('YML file parsed correctly', () => {
  expect(parsers.parseFile(pathOne)).toMatchObject(templateFileOneParsed);
});
