const m2i = (arr,i) =>
  arr.slice(0,arr.length-i)
    .reduce((a,c)=>c>a?c:a);
const mji = (n) => (b) =>
  +[...Array(n)].reduce(([m,r],_,i)=>
    ((max=m2i(r,n-i-1))=>[
        [...m,max],
        r.slice(r.indexOf(max)+1)
      ])(),[[],b])[0].join('');

export const part1 = (input) =>
  input.map(mji(2)).reduce((a,c)=>a+c);

export const part2 = (input) =>
  input.map(mji(12)).reduce((a,c)=>a+c);

export const init = (data) =>
  data.split('\n').map(r=>r.split(''));