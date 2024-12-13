import {log} from '#display';
import * as helper from '#helper';
import {seperate,lineWise,toNum} from '#parser';

export const part1 = (input) =>
  input.map(([[x1,x2],[y1,y2],[p1,p2]],i)=> {
    const c1 = p1*x2-p2*x1
    const c2 = y1*x2-y2*x1;
    if (c1 % c2) return 0;
    const b = c1 / c2;
    const a = (p1-b*y1)/x1;
    log(a,b,i+1)
    return a*3+b;
  }).reduce((a,c)=>a+c);

export const part2 = (input) => 
  input.map(([x,y,p],i)=> {
    const [x1,x2] = toBigInt(x);
    const [y1,y2] = toBigInt(y);
    const [p1,p2] = toBigInt(p)
      .map(x=>x+10000000000000n);
    const c1 = p1*x2-p2*x1
    const c2 = y1*x2-y2*x1;
    if (c1 % c2) return 0n;
    const b = c1 / c2;
    const a = (p1-b*y1)/x1;
    return a*3n+b;
  }).reduce((a,c)=>a+c,0n);

const toBigInt = v => v.map(x=>BigInt(x));

export const init = (data) => 
  seperate(data).map(g=>
    g.map(l=>l.match(/(\d+)/g).map(toNum)));