export const part1 = (input) =>
  recNext(input,40);

export const part2 = (input) =>
  recNext(input,50);

export const init = (data) => data;

const next = (ns) =>
  ns.replace(/([1-3])\1*/g, (a,b)=>
    a.length+b);

const recNext = (ns,n) =>
  n?ns.split(/(?<=2)(?=13[12])/)
    .map(nsc=>recNext(next(nsc),n-1))
    .reduce((a,c)=>a+c):ns.length;