import {log} from '#display';

export const part1 = (input) =>
  input.map(numOfSols)
  .reduce((a,[r,c])=>r?a+c:a,0);

export const part2 = (input) =>
  // Write your code here
  'Solution2';

export const init = (data) =>
  data.split('\n').map(x=>x.match(/\d+/g).map(x=>+x))
  .map(([r,...ops])=>[r,ops]);

const numOfSols = ([r,ops]) =>
  [allCombs(ops.reverse()).filter(x=>r==x).length,r];

const allCombs = (ops) =>
  ops.length==1?[ops[0]]:[0,1,2].map(o=>
    allCombs(ops.slice(1))
    .map(x=>{
      switch(o) {
        case 0: return ops[0]*x;
        case 1: return ops[0]+x;
        default: return +((''+x)+ops[0])
      }
    })).flat();