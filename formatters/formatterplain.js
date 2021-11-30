import _ from 'lodash';
import { plainFormat } from './formatsdescription.js';
import { getPropStatusAndValues, putQuotesIfNeeded } from '../src/sharedfunctions.js';

const makeSubString = (key, obj, path) => {
  const {
    startWith,
    addedValMiddle,
    removedValMiddle,
    updatedValMiddle,
    updatedValLast,
  } = plainFormat;

  const propData = getPropStatusAndValues(key, obj);
  const propStatus = propData[0];
  const oldVal = _.isObject(propData[1]) ? '[complex value]' : putQuotesIfNeeded(propData[1]);
  const newVal = _.isObject(propData[2]) ? '[complex value]' : putQuotesIfNeeded(propData[2]);

  const newSubString = [];

  if (propStatus === 'updated' && key.charAt(0) === '+') newSubString.push(`${startWith}'${path}'${updatedValMiddle}${oldVal}${updatedValLast}${newVal}`);
  if (propStatus === 'added') newSubString.push(`${startWith}'${path}'${addedValMiddle}${newVal}`);
  if (propStatus === 'removed') newSubString.push(`${startWith}'${path}'${removedValMiddle}`);

  return newSubString;
};

const formatPlainOutput = (diffObject, branchPath = []) => {
  const entries = Object.entries(diffObject);

  const arrSubstrings = entries.map(([key, val]) => {
    const substring = [];

    const propNameOnly = (key.charAt(0) === '+' || key.charAt(0) === '-') ? key.substring(2, key.length) : key;
    const path = (branchPath.length === 0) ? propNameOnly : [branchPath, propNameOnly].join('.');

    const valIsObject = _.isObject(val);
    const valIsEmpty = _.isEmpty(val);

    if ((!valIsObject) || (valIsObject && valIsEmpty)) {
      substring.push(makeSubString(key, diffObject, path));
    } else substring.push(formatPlainOutput(val, path));
    if (valIsObject && !valIsEmpty) {
      substring.push(makeSubString(key, diffObject, path));
    }
    return substring;
  });

  return arrSubstrings;
};

const makePlainOutput = (diffObject) => {
  const plainDiffOutput = formatPlainOutput(diffObject);
  const result = plainDiffOutput.flat(Infinity).join('\n');
  return result;
};

export default makePlainOutput;
