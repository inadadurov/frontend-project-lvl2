import _ from 'lodash';
import * as formats from './formatsdescription.js';

/*
const fStylish = {
  startWith: '{\n',
  endWith: '\n}',
  newLineSpacing: ' ',
  defaultSpacingQty: 2,
  noDiffSignSpacingQty: 2,
  separator: ': ',
  newline: '\n',
};
*/

const setFormat = (outputFormat) => {
  if (outputFormat === 'otherFormat') {
    return formats.otherFormat;
  }
  return formats.fStylish;
};

const makeOutputString = (inputObj, outputFormat) => {
  const format = setFormat(outputFormat);

  const { startWith } = format;
  const { endWith } = format;
  const { spacing } = format;
  const { defaultSpacingQty } = format;
  const { ifSignSpacingQty } = format;
  const { separator } = format;

  const makeString = (currentValue, currDepthLevel) => {
    if (_.isObject(currentValue) === false) {
      // console.log(JSON.stringify(currentValue));
      return `${currentValue}`;
    }

    const entries = Object.entries(currentValue);

    const inheritedSpacing = spacing.repeat(defaultSpacingQty * currDepthLevel);
    const closingBraceSpacing = inheritedSpacing;

    const lines = entries.map(([key, val]) => {
      const addSPacing = (key.charAt(0) === '+' || key.charAt(0) === '-') ? spacing.repeat(ifSignSpacingQty) : spacing.repeat(defaultSpacingQty);
      const spacingBefore = `${inheritedSpacing}${addSPacing}`;
      const line = `${spacingBefore}${key}${separator}${makeString(val, currDepthLevel + 1)}`;
      return line;
    });

    const toReturn = [
      `${startWith}`,
      ...lines,
      `${closingBraceSpacing}${endWith}`,
    ].join('\n');

    // console.log(toReturn);
    return toReturn;
  };

  return makeString(inputObj, 0);
};

export { makeOutputString, setFormat };
