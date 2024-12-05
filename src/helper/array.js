export const rng = (n, m) =>
  [...Array(m - n)].map((_, i) => i + n);

export const count = (arr, f = x=>x) =>
  arr.filter(f).length;

export const allBut = (arr, i) =>
  arr.filter((x,j)=>j!==i);

export const sum = (arr) =>
  (typeof arr === 'object' ? arr : [...arguments])
    .reduce((a, c) => a + c, 0);

export const allPairs = (arr) =>
  arr.map((x,i)=>arr.slice(i+1).map(y=>[x,y])).flat();

export const allPerms = (arr, n) =>
  n==2?allPairs(arr)
  :arr.map((x,i)=>
    allPerms(arr.slice(i+1),n-1)
    .map(y=>[x,...y])).flat();

export const insert = (arr, n, i) =>
  [...arr.slice(0,i),n,...arr.slice(i)];

const getSortedIndex = (arr, n) =>
  [...arr].reduce(([low,high],c,i,a)=>
    low>=high
    ? a.splice(1)&&[low]
    : ((mid)=>arr[mid]<n
      ?[mid+1,high]
      :[low,mid])
    ((low + high) >>> 1),
  [0,arr.length])[0];

export const insertSorted = (arr, n) =>
  insert(arr, n, getSortedIndex(arr,n));