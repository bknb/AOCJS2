export const rng = (n, m) =>
  [...Array(m?m-n:n)].map((_,i) =>m?i+n:i);

export const count = (arr, f = x=>x) =>
  arr.filter(f).length;

export const allBut = (arr, i) =>
  arr.filter((x,j)=>j!==i);

export const eq = (a,b) =>a.every((_,i)=>a[i]==b[i]);

export const sum = (arr) =>
  (typeof arr === 'object' ? arr : [...arguments])
    .reduce((a, c) => a + c, 0);

export const allPairs = (arr) =>
  arr.map((x,i)=>arr.slice(i+1).map(y=>[x,y])).flat();

export const revCopy = (arr) => arr.slice().reverse()

export const allPerms = (arr, n) =>
  n==2?allPairs(arr)
  :arr.map((x,i)=>
    allPerms(arr.slice(i+1),n-1)
    .map(y=>[x,...y])).flat();

export const buckets = (arr, cond) => {
  const def = [], cf = [];
  arr.forEach(e=>(cond(e)?cf:def).push(e));
  return [def,cf];
}

export const sortedI = (arr, n, cmp=(a,b)=>a-b) => {
  let l=0,h=arr.length;
  while(l<h) {
    const p=(l+h)>>>1;
    cmp(arr[p],n)<0
      ?l=p+1:h=p;
  }
  return l;
}

export const insert = (arr, n, cmp)=>
  arr.splice(sortedI(arr,n,cmp), 0, n)&&arr;

export const remove = (arr, n)=>
  arr.splice(arr.indexOf(n),1)[0];