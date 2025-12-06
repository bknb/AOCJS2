import {transpose, sum} from '#helper';
import {sepH} from '#parser';

const solve = f => bs =>
  sum(bs.map(([isP,ns])=>
    (f?f(ns):ns)
      .map(n=>+n.join(''))
      .reduce((a,c)=>
        isP?a+c:a*c,isP?0:1)));

export const part1 = solve();

export const part2 = solve(transpose);

export const init = data =>
  sepH(data).map(b=>
    [b.pop()[0]=='+',b]);