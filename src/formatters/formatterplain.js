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

    if ((val.type === 'node') || (val.type === 'branch' && val.status !== 'unchanged')) {
      const oldVal = (_.isArray(val.valueOld)) ? '[complex value]' : putQuotesIfNeeded(val.valueOld);
      const newVal = (_.isArray(val.valueNew)) ? '[complex value]' : putQuotesIfNeeded(val.valueNew);

      if (val.status === 'unchanged') return '';
      if (val.status === 'added') return `${fPlain.startWith}'${newPath}'${fPlain.addedValMiddle}${newVal}`;
      if (val.status === 'removed') return `${fPlain.startWith}'${newPath}'${fPlain.removedValMiddle}`;
      if (val.status === 'updated') return `${fPlain.startWith}'${newPath}'${fPlain.updatedValMiddle}${oldVal}${fPlain.updatedValLast}${newVal}`;
    }
    return formatPlainOutput(val.valueOld, newPath);
  });

  return subStrings;
};

const makePlainOutput = (diffArr) => {
  const plainDiffOutput = formatPlainOutput(diffArr);
  const result = _.compact(plainDiffOutput.flat(Infinity)).join('\n');
  return result;
};

export default makePlainOutput;
