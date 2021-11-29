import { fileURLToPath } from 'url';
import * as path from 'path';
import { test, expect } from '@jest/globals';
import { makeDiffRecord } from '../index.js';
import { parseFile } from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const referenceDiffObjFilePath = path.join(__dirname, '..', 'fixtures', 'CorrectDiffObject.json');
const diffObject = parseFile(referenceDiffObjFilePath);

// tests for JSON files
const pathJSON1 = path.join(__dirname, '..', 'fixtures', 'jsonFile1.json');
const pathJSON2 = path.join(__dirname, '..', 'fixtures', 'jsonFile2.json');
const JSON1Parsed = parseFile(pathJSON1);
const JSON2Parsed = parseFile(pathJSON2);

test('correct diff object created for JSON', () => {
  expect(makeDiffRecord(JSON1Parsed, JSON2Parsed)).toMatchObject(diffObject);
});

// tests for YML files
const pathYML1 = path.join(__dirname, '..', 'fixtures', 'ymlFile1.yml');
const pathYML2 = path.join(__dirname, '..', 'fixtures', 'ymlFile2.yaml');
const YML1Parsed = parseFile(pathYML1);
const YML2Parsed = parseFile(pathYML2);

test('correct diff object created for YML', () => {
  expect(makeDiffRecord(YML1Parsed, YML2Parsed)).toMatchObject(diffObject);
});
