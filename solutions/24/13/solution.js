import {debug} from '#display';
import {seperate,lineWise,toNum} from '#parser';

export const part1 = (input) =>
  solve(input);

export const part2 = (input) => 
  solve(input.map(([x,y,p])=>
    [x,y,p.map(c=>c+10000000000000)]),true);

const solve = (input,big)=> 
  input.map(([x,y,p])=> {
    const [x1,x2] = big?toBigInt(x):x;
    const [y1,y2] = big?toBigInt(y):y;
    const [p1,p2] = big?toBigInt(p):p;
    const c1 = p1*x2-p2*x1;
    const c2 = y1*x2-y2*x1;
    if (c1%c2) return big?0n:0;
    const b = c1 / c2;
    const d = p1-b*y1;
    if (d%x1) return big?0n:0;
    const a = d/x1;
    return a*(big?3n:3)+b;
  }).reduce((a,c)=>a+c);

const toBigInt = v => v.map(x=>BigInt(x));

export const init = (data) => 
  seperate(data).map(g=>
    g.map(l=>l.match(/\d+/g).map(toNum)));