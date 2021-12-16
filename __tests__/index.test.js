/* eslint-disable jest/no-commented-out-tests */
import fs from 'fs';
import { fileURLToPath } from 'url';
import * as path from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../index.js';
import { parseFile } from '../src/parsers.js';
import diffArray from '../fixtures/DiffArray.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// tests for JSON files
const pathJSON1 = path.join(__dirname, '..', 'fixtures', 'jsonFile1.json');
const pathJSON2 = path.join(__dirname, '..', 'fixtures', 'jsonFile2.json');
const JSON1Parsed = parseFile(pathJSON1);
const JSON2Parsed = parseFile(pathJSON2);

test('correct diff object created for JSON', () => {
  expect(makeDiffRecord(JSON1Parsed, JSON2Parsed)).toEqual(diffArray);
});

// tests for YML files
const pathYML1 = path.join(__dirname, '..', 'fixtures', 'ymlFile1.yml');
const pathYML2 = path.join(__dirname, '..', 'fixtures', 'ymlFile2.yaml');
// const YML1Parsed = parseFile(pathYML1);
// const YML2Parsed = parseFile(pathYML2);

/*
test('correct diff object created for YML', () => {
  expect(makeDiffRecord(YML1Parsed, YML2Parsed)).toEqual(diffArray);
});
*/

const refStringFilePathPlain = path.join(__dirname, '..', 'fixtures', 'CorrectDiffString_FormatPlain.txt');
const referenceStringPlain = fs.readFileSync(refStringFilePathPlain, { encoding: 'utf8' });

test('correct output for "plain" format', () => {
  expect(genDiff(pathYML1, pathYML2, 'plain')).toMatch(referenceStringPlain);
});

const refStringFilePathfStylish = path.join(__dirname, '..', 'fixtures', 'CorrectDiffString_FormatStylish.txt');
const referenceStringfStylish = fs.readFileSync(refStringFilePathfStylish, { encoding: 'utf8' });

test('correct output for default format', () => {
  expect(genDiff(pathYML1, pathYML2, 'fStylish')).toMatch(referenceStringfStylish);
});
