import _ from 'lodash';
import { diffProperties } from '../shared.js';

const makeJsonOutput = (diffArr) => {
  const makeObjRecord = (value) => {
    const filtered = diffProperties.filter((property) => _.has(value, property));

    const obj = filtered.reduce((acc, property) => {
      if (_.isArray(value[property])) {
        _.assignIn(acc, { [property]: makeJsonOutput(value[property]) });
        return acc;
      }
      _.assignIn(acc, { [property]: value[property] });
      return acc;
    }, {});

    return obj;
  };

  const ObjectForJSON = diffArr.reduce((acc, val) => {
    _.assignIn(acc, { [val.name]: makeObjRecord(val) });
    return acc;
  }, {});

  return ObjectForJSON;
};

export default makeJsonOutput;
