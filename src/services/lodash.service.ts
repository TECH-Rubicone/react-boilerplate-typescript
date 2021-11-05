
// outsource dependencies
import { forEach, map, isEmpty, sortBy, filter, orderBy, groupBy, merge, size, find, head, get, set, times, uniqueId, isNull, isString, isArray, isObject, isFunction, isUndefined, isEqual, isRegExp, last, flatMap, every, defaults } from 'lodash';

export const LodashService = {
  get,
  set,
  times,
  defaults,
  uniqueId,

  map,
  head,
  last,
  size,
  find,
  every,
  merge,
  filter,
  sortBy,
  forEach,
  orderBy,
  groupBy,
  flatMap,

  isNull,
  isArray,
  isEmpty,
  isEqual,
  isString,
  isObject,
  isRegExp,
  isFunction,
  isUndefined,
};

export default LodashService;
