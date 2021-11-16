import { fileURLToPath } from 'url';
import * as path from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../index.js';
import { parseFile } from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const referenceDiffObjFilePath = path.join(__dirname, '..', 'fixtures', 'CorrectDiffObject.json');
const diffObject = parseFile(referenceDiffObjFilePath);

// tests for JSON files
const pathJSON1 = path.join(__dirname, '..', 'fixtures', 'jsonFile1.json');
const pathJSON2 = path.join(__dirname, '..', 'fixtures', 'jsonFile2.json');

test('correct diff object created for JSON', () => {
  expect(genDiff(pathJSON1, pathJSON2)).toMatchObject(diffObject);
});

// tests for YML files
const pathYML1 = path.join(__dirname, '..', 'fixtures', 'ymlFile1.yml');
const pathYML2 = path.join(__dirname, '..', 'fixtures', 'ymlFile2.yaml');

test('correct diff object created for YML', () => {
  expect(genDiff(pathYML1, pathYML2)).toMatchObject(diffObject);
});
