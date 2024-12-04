export const rng = (n, m) =>
  [...Array(m - n)].map((_, i) => i + n);

export const count = (arr, f = x=>x) =>
  arr.filter(f).length;

export const allBut = (arr, i) =>
  arr.filter((x,j)=>j!==i);

export const sum = (arr) =>
  (typeof arr === 'object' ? arr : [...arguments])
    .reduce((a, c) => a + c, 0);

export const insertSorted = (arr, n) =>
  arr.splice(getSortedIndex(arr,n), 0, n);

export const getEdges = (i,j,input) =>
  [0,1].map(x=>[0,1].map(y=>
    input[i+(x?1:-1)][j+(y?1:-1)])).flat();

export const mapGrid = (input, func) =>
  input.map((x,i)=>
    x.map((y,j)=>
      func(i,j,input)));

export const sumGrid = (grid) =>
  grid.reduce((a,c)=>
    (a+c.reduce((a,c)=>
      (a+c),0)),0);

export const getNext = (c,dir) => {
  switch(dir) {
    case 0: c[0]--; case 1: c[1]++; break;
    case 2: c[1]++; case 3: c[0]++; break;
    case 4: c[0]++; case 5: c[1]--; break;
    case 6: c[1]--; case 7: c[0]--; break;
  }
  return c;
};

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