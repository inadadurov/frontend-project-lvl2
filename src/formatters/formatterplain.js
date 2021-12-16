import _ from 'lodash';
import { putQuotesIfNeeded } from '../shared.js';

const fPlain = {
  startWith: 'Property ',
  addedValMiddle: ' was added with value: ',
  removedValMiddle: ' was removed',
  updatedValMiddle: ' was updated. From ',
  updatedValLast: ' to ',
};

const formatPlainOutput = (diffArr, path = []) => {
  const subStrings = diffArr.map((val) => {
    const newPath = (path.length === 0) ? val.name : [path, val.name].join('.');

    const subString = [];

    if ((val.type === 'node') || (val.type === 'branch' && val.status !== 'unchanged')) {
      const oldVal = (_.isArray(val.valueOld)) ? '[complex value]' : putQuotesIfNeeded(val.valueOld);
      const newVal = (_.isArray(val.valueNew)) ? '[complex value]' : putQuotesIfNeeded(val.valueNew);

      if (val.status === 'added') subString.push(`${fPlain.startWith}'${newPath}'${fPlain.addedValMiddle}${newVal}`);
      if (val.status === 'removed') subString.push(`${fPlain.startWith}'${newPath}'${fPlain.removedValMiddle}`);
      if (val.status === 'updated') subString.push(`${fPlain.startWith}'${newPath}'${fPlain.updatedValMiddle}${oldVal}${fPlain.updatedValLast}${newVal}`);
    } else subString.push(formatPlainOutput(val.valueOld, newPath));

    return subString;
  });

  return subStrings;
};

const makePlainOutput = (diffArr) => {
  const plainDiffOutput = formatPlainOutput(diffArr);
  const result = plainDiffOutput.flat(Infinity).join('\n');
  return result;
};

export default makePlainOutput;
