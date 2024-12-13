import {seperate,lineWise,toNum} from '#parser';

const inc = 10000000000000;

export const part1 = (input) =>
  solve(input);

export const part2 = (input) => 
  solve(input.map(([x,y,p])=>
    [x,y,p.map(c=>c+inc)]));

const solve = (input)=>
  input.map(([x,y,p])=> {
    const [x1,x2] = toBigInt(x);
    const [y1,y2] = toBigInt(y);
    const [p1,p2] = toBigInt(p);
    const c1 = p1*x2-p2*x1;
    const c2 = y1*x2-y2*x1;
    if (c1%c2) return 0n;
    const b = c1/c2;
    const d = p1-b*y1;
    if (d%x1) return 0n;
    const a = d/x1;
    return a*3n+b;
  }).reduce((a,c)=>a+c);

const toBigInt = v => v.map(x=>BigInt(x));

export const init = (data) => 
  seperate(data).map(g=>
    g.map(l=>l.match(/\d+/g).map(toNum)));