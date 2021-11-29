import _ from 'lodash';
import { fStylish } from './formatsdescription.js';

const makeFStylishOutput = (inputObj) => {
  const { startWith } = fStylish;
  const { endWith } = fStylish;
  const { spacing } = fStylish;
  const { defaultSpacingQty } = fStylish;
  const { ifSignSpacingQty } = fStylish;
  const { separator } = fStylish;

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

export default makeFStylishOutput;
