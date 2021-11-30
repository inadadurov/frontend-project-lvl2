import _ from 'lodash';

const getPropStatusAndValues = (propName, obj) => {
  if (propName.charAt(0) !== '+' && propName.charAt(0) !== '-') {
    return ['unchanged', obj[propName], undefined];
  }
  if (propName.charAt(0) === '+' || propName.charAt(0) === '-') {
    const nameOnly = propName.substring(2, propName.length);
    if (_.has(obj, `+ ${nameOnly}`) && _.has(obj, `- ${nameOnly}`)) return ['updated', obj[`- ${nameOnly}`], obj[`+ ${nameOnly}`]];
    if (_.has(obj, `+ ${nameOnly}`) && !_.has(obj, `- ${nameOnly}`)) return ['added', undefined, obj[`+ ${nameOnly}`]];
    return ['removed', obj[`- ${nameOnly}`], undefined];
  }
  return 'branch';
};

const putQuotesIfNeeded = (value) => ([true, false, null, undefined].includes(value) ? value : `'${value}'`);

export { getPropStatusAndValues, putQuotesIfNeeded };
