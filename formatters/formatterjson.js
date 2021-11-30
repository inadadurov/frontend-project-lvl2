import _ from 'lodash';
import { getPropStatusAndValues } from '../src/sharedfunctions.js';

const makeRecordInObject = (diffObject) => {
  const entries = Object.entries(diffObject);

  const ObjectForJSON = entries.reduce((acc, [key, val]) => {
    const [propStatus, oldVal, newVal] = getPropStatusAndValues(key, diffObject);
    const propNameOnly = (key.charAt(0) === '+' || key.charAt(0) === '-') ? key.substring(2, key.length) : key;

    const valIsObject = _.isObject(val);

    const descriptionObj = {};

    if (!valIsObject) {
      if (propStatus !== 'updated') {
        descriptionObj.status = propStatus;
        descriptionObj.value = val;
      } else {
        descriptionObj.status = propStatus;
        descriptionObj.oldValue = oldVal;
        descriptionObj.newValue = newVal;
      }
      acc[propNameOnly] = descriptionObj;
    } else {
      acc[propNameOnly] = makeRecordInObject(val);
      _.assignIn(acc, { [`branch '${propNameOnly}' status`]: propStatus });
    }
    return acc;
  }, {});

  return ObjectForJSON;
};

const makeJsonOutput = (diffObject) => {
  const forJSON = makeRecordInObject(diffObject);
  return JSON.stringify(forJSON, null, 4);
};

export default makeJsonOutput;
