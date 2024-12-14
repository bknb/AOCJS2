import {seperate} from '#parser';

const inc = 10000000000000n;

export const part1 = (input) =>
  solve(input);

export const part2 = (input) => 
  solve(input.map(([x,y,p])=>
    [x,y,p.map(c=>c+inc)]));

const solve = (input)=>
  input.map(getTokens)
  .reduce((a,c)=>a+c);

export const init = (data) => 
  seperate(data).map(g=>
    g.map(l=>l.match(/\d+/g)
      .map(x=>BigInt(x))));

const getTokens=
  ([[x1,x2],[y1,y2],[p1,p2]])=>((
    c1=p1*x2-p2*x1,
    c2=y1*x2-y2*x1)=>
    c1%c2?0n:((
      b=c1/c2,
      d=p1-b*y1)=>
      d%x1?0n:
      (d/x1)*3n+b)())();