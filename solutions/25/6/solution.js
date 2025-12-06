import {transpose, sum} from '#helper';
import {sepH} from '#parser';

const solve = (bs,f) =>
  sum(bs.map(([isP,ns])=>
    (f?f(ns):ns)
      .map(n=>+n.join(''))
      .reduce((a,c)=>
        isP?a+c:a*c,isP?0:1)));

export const part1 = bs =>
  solve(bs);

export const part2 = bs =>
  solve(bs,transpose);

export const init = (data) =>
  sepH(data).map(b=>
    [b.pop()[0]=='+',b]);