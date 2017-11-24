// 取随机数
const getRandomIndex = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// 重新排序
export const rearRange = (arr) => {
  let _arr = arr.slice();
  for (let i = 0; i < _arr.length; i++) {
    const j = getRandomIndex(0, i);
    const t = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = t;
  }

  return _arr;
}
