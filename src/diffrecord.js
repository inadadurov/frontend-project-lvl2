import _ from 'lodash';

const writeChildrenInArray = (obj) => {
  const entries = Object.entries(obj);

  const asArray = entries.reduce((acc, [key, val]) => {
    if (!_.isObject(val)) {
      acc.push({
        name: key, type: 'node', status: 'unchanged', valueOld: val,
      });
    } else {
      acc.push({
        name: key, type: 'node', status: 'unchanged', valueOld: writeChildrenInArray(val),
      });
    }
    return acc;
  }, []);

  return asArray;
};

const makeDiffRecord = (objectOne, objectTwo) => {
  const firstObjectKeys = Object.keys(objectOne);
  const secondObjectKeys = Object.keys(objectTwo);

  const uniqueKeysNames = _.union([...firstObjectKeys, ...secondObjectKeys]).sort();

  const diffRecord = uniqueKeysNames.reduce((acc, key) => {
    const objOneKeyValIsObject = _.isObject(objectOne[key]);
    const objTwoKeyValIsObject = _.isObject(objectTwo[key]);

    const obj = {};

    if (key in objectOne && key in objectTwo) {
      if (objOneKeyValIsObject && objTwoKeyValIsObject) {
        _.assignIn(obj, {
          name: key, type: 'branch', status: 'unchanged', valueOld: makeDiffRecord(objectOne[key], objectTwo[key]),
        });
      } else if (objOneKeyValIsObject && !objTwoKeyValIsObject) {
        _.assignIn(obj, {
          name: key, type: 'branch', typeNew: 'node', status: 'updated', valueOld: writeChildrenInArray(objectOne[key]), valueNew: objectTwo[key],
        });
      } else if (!objOneKeyValIsObject && objTwoKeyValIsObject) {
        _.assignIn(obj, {
          name: key, type: 'node', typeNew: 'branch', status: 'updated', valueOld: objectOne[key], valueNew: writeChildrenInArray(objectTwo[key]),
        });
      } else if (!objOneKeyValIsObject && !objTwoKeyValIsObject) {
        if (objectOne[key] === objectTwo[key]) {
          _.assignIn(obj, {
            name: key, type: 'node', status: 'unchanged', valueOld: objectOne[key],
          });
        } else {
          _.assignIn(obj, {
            name: key, type: 'node', typeNew: 'node', status: 'updated', valueOld: objectOne[key], valueNew: objectTwo[key],
          });
        }
      }
    } else if (key in objectOne && !(key in objectTwo)) {
      const valueType = (objOneKeyValIsObject === true) ? 'branch' : 'node';
      _.assignIn(obj, {
        name: key, type: valueType, status: 'removed', valueOld: (valueType === 'branch' ? writeChildrenInArray(objectOne[key]) : objectOne[key]),
      });
    } else {
      const valueType = (objTwoKeyValIsObject === true) ? 'branch' : 'node';
      _.assignIn(obj, {
        name: key, type: valueType, status: 'added', valueNew: (valueType === 'branch' ? writeChildrenInArray(objectTwo[key]) : objectTwo[key]),
      });
    }

    acc.push(obj);

    return acc;
  }, []);

  return diffRecord;
};

export default makeDiffRecord;
