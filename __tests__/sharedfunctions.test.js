import { test, expect } from '@jest/globals';
import { getPropStatusAndValues, putQuotesIfNeeded } from '../src/sharedfunctions.js';
import diffObj from '../fixtures/DiffObject.js';

test('quotes are put correctly depending on value type', () => {
  expect(putQuotesIfNeeded(true)).toBe(true);
  expect(putQuotesIfNeeded(undefined)).toBe(undefined);
  expect(putQuotesIfNeeded('undefined')).toMatch('undefined');
});

test('property information aquired correctly', () => {
  expect(getPropStatusAndValues('+ follow', diffObj)).toEqual(['added', undefined, false]);
  expect(getPropStatusAndValues('- setting2', diffObj)).toEqual(['removed', 200, undefined]);
  expect(getPropStatusAndValues('setting1', diffObj)).toEqual(['unchanged', 'Value 1', undefined]);
});
