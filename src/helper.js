export const sum = (arr) =>
  (typeof arr === 'object' ? arr : [...arguments])
    .reduce((a, c) => a + c, 0);

export const insertSorted = (arr, n) =>
  arr.splice(getSortedIndex(arr,n), 0, n);

function getSortedIndex(arr, n) {
  let low = 0,
      high = arr.length;

  while (low < high) {
    const mid = (low + high) >>> 1;
    if (arr[mid] < n) low = mid + 1;
    else high = mid;
  }
  return low;
}