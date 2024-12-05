import { arrayBuffer } from "stream/consumers";

export const rng = (n, m) =>
  [...Array(m - n)].map((_, i) => i + n);

export const count = (arr, f = x=>x) =>
  arr.filter(f).length;

export const allBut = (arr, i) =>
  arr.filter((x,j)=>j!==i);

export const sum = (arr) =>
  (typeof arr === 'object' ? arr : [...arguments])
    .reduce((a, c) => a + c, 0);

export const insert = (arr, n, i) =>
  [...arr.slice(0,i),n,...arr.slice(i)];

export const insertSorted = (arr, n) =>
  insert(arr, n, getSortedIndex(arr,n));

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