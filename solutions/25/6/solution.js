import {T, sum} from '#helper';
import {sepH} from '#parser';

const solve = (isP,ns) =>
  ns.map(n=>+n.join(''))
    .reduce((a,c)=>
      isP?a+c:a*c,isP?0:1);

export const part1 = (bs) =>
  sum(bs.map(([isP,ns])=>
    solve(isP,ns)));

export const part2 = (bs) =>
  sum(bs.map(([isP,ns])=>
    solve(isP,T(ns))));

export const init = (data) =>
  sepH(data).map(b=>
    [b.pop()[0]=='+',b]);