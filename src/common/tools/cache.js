import storage from 'good-storage';
// import { seagreen } from '../../../../../Library/Caches/typescript/2.6/node_modules/@types/color-name';

const SEARCH_KEY = '_search_';
const SEARCH_MAX_LEN = 15;

const insertArray = (arr, val, compare, maxLen) => {
  const index = arr.findIndex(compare);

  if (index === 0) {
    return;
  }
  if (index > 0) {
    arr.splice(index, 1);
  }
  arr.unshift(val);
  if (maxLen && arr.length > maxLen) {
    arr.pop();
  }
}

const deleteFromArray = (arr, compare) => {
  const index = arr.findIndex(compare);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

export const saveSearch = (query) => {
  let searches = storage.get(SEARCH_KEY, []);

  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN);

  storage.set(SEARCH_KEY, searches);

  return searches;
}

export const loadSearch = () => {
  return storage.get(SEARCH_KEY, []);
}

export const deleteSearch = (query) => {
  let searches = storage.get(SEARCH_KEY, []);
  deleteFromArray(searches, (item) => {
    return item === query
  });
  storage.set(SEARCH_KEY, searches);
  return searches;
}

export const clearSearch = () => {
  storage.remove(SEARCH_KEY)
  return []
}
