import {rng} from '#helper';
import {seperate} from '#parser';

export const part1 = ([deers,time]) =>
  deers.map(d=>dist(d,time))
  .reduce((a,c)=>Math.max(a,c));

export const part2 = ([deers,time]) => 
  rng(1,time+1).map(t=>deers.map(d=>dist(d,t)))
  .reduce((a,dds)=>
    (mdd=>dds.map((dd,i)=>((dd==mdd)|0)+a[i]))
    (Math.max(...dds)),rng(0,deers.length).map(_=>0))
  .reduce((a,c)=>Math.max(a,c));

export const init = (data) => 
  (([deers,[time]])=>[deers.map(x=>
    x.match(/\d+/g).map(x=>+x)),+time])
  (seperate(data));

const dist = ([sp,st,rt],t)=>
  ((t/(st+rt))|0)*(sp*st)+Math.min(t%(st+rt),st)*sp;