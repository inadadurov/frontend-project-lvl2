import _ from 'lodash';

const putQuotesIfNeeded = (value) => (([true, false, null, undefined].includes(value) || _.isFinite(value)) ? value : `'${value}'`);

const diffProperties = ['status', 'type', 'typeNew', 'valueOld', 'valueNew'];

export { putQuotesIfNeeded, diffProperties };
