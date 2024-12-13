import {seperate} from '#parser';

const inc = 10000000000000n;

export const part1 = (input) =>
  solve(input);

export const part2 = (input) => 
  solve(input.map(([x,y,p])=>
    [x,y,p.map(c=>c+inc)]));

const solve = (input)=>
  input.map(
    ([[x1,x2],[y1,y2],[p1,p2]])=> {
      const c1 = p1*x2-p2*x1;
      const c2 = y1*x2-y2*x1;
      if (c1%c2) return 0n;
      const b = c1/c2;
      const d = p1-b*y1;
      if (d%x1) return 0n;
      const a = d/x1;
      return a*3n+b;
    }).reduce((a,c)=>a+c);

export const init = (data) => 
  seperate(data).map(g=>
    g.map(l=>l.match(/\d+/g)
      .map(x=>BigInt(x))));