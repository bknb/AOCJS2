import {revCopy} from '#helper';

const opO = {
  '+': (a, b) => a + b,
  '*': (a, b) => a * b,
  '||': (a, b) => +((''+a)+b),
};

export const part1 = (input) =>
  input.map(numOfSols(['+','*']))
  .reduce((a,[r,c])=>r?a+c:a,0);

export const part2 = (input) =>
  input.map(numOfSols(['+','*','||']))
  .reduce((a,[r,c])=>r?a+c:a,0);

export const init = (data) =>
  data.split('\n').map(x=>
    x.match(/\d+/g).map(x=>+x))
  .map(([r,...ops])=>[r,ops]);

const numOfSols = (opL)=>([r,ops])=>
  [allCombs(opL,revCopy(ops))
   .some(x=>r==x),r];

const allCombs = (opL,[s,...oR]) =>
  !oR.length?[s]:opL.map(o=>
    allCombs(opL,oR)
    .map(x=>opO[o](x,s))).flat();