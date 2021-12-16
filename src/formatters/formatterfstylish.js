import _ from 'lodash';

const fStylish = {
  startWith: '{',
  endWith: '}',
  spacing: ' ',
  defaultSpacingQty: 4,
  ifSignSpacingQty: 2,
  separator: ': ',
};

const makeFStylishOutput = (inputDiff) => {
  const makeString = (currentValue, depth) => {
    const inheritedSpacing = fStylish.spacing.repeat(fStylish.defaultSpacingQty * depth);
    const closingBraceSpacing = inheritedSpacing;

    const lines = currentValue.map((val) => {
      const addSPacing = (val.status === 'unchanged') ? fStylish.spacing.repeat(fStylish.defaultSpacingQty) : fStylish.spacing.repeat(fStylish.ifSignSpacingQty);
      const spacingBefore = `${inheritedSpacing}${addSPacing}`;

      const valOld = _.isArray(val.valueOld) ? makeString(val.valueOld, depth + 1) : val.valueOld;
      const valNew = _.isArray(val.valueNew) ? makeString(val.valueNew, depth + 1) : val.valueNew;

      if (val.type === 'node') {
        if (val.status === 'unchanged') {
          return `${spacingBefore}${val.name}${fStylish.separator}${valOld}`;
        }

        if (val.status === 'added') {
          return `${spacingBefore}+ ${val.name}${fStylish.separator}${valNew}`;
        }

        if (val.status === 'removed') {
          return `${spacingBefore}- ${val.name}${fStylish.separator}${valOld}`;
        }

        if (val.status === 'updated') {
          return `${spacingBefore}- ${val.name}${fStylish.separator}${valOld}\n${spacingBefore}+ ${val.name}${fStylish.separator}${valNew}`;
        }
      }
      if (val.name === 'nest') {
        console.log('');
      }
      if (val.type === 'branch' && val.status === 'unchanged') {
        return `${spacingBefore}${val.name}${fStylish.separator}${makeString(val.valueOld, depth + 1)}`;
      }

      if (val.type === 'branch' && val.status === 'added') {
        return `${spacingBefore}+ ${val.name}${fStylish.separator}${makeString(val.valueNew, depth + 1)}`;
      }

      if (val.type === 'branch' && val.status === 'removed') {
        return `${spacingBefore}- ${val.name}${fStylish.separator}${makeString(val.valueOld, depth + 1)}`;
      }

      if (val.type === 'branch' && val.status === 'updated') {
        return `${spacingBefore}- ${val.name}${fStylish.separator}${valOld}\n${spacingBefore}+ ${val.name}${fStylish.separator}${valNew}`;
      }

      const line = `${spacingBefore}${val.name}${fStylish.separator}${makeString(val.valueOld, depth + 1)}`;

      return line;
    });

    const toReturn = [
      `${fStylish.startWith}`,
      ...lines,
      `${closingBraceSpacing}${fStylish.endWith}`,
    ].join('\n');

    return toReturn;
  };

  return makeString(inputDiff, 0);
};

export default makeFStylishOutput;
