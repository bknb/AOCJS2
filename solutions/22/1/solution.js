import {log} from '#display';
import * as helper from '#helper';
import {seperate, toNum} from '#parser';

export const part1 = (input) => 
  input.reduce((a,e)=>
    Math.max(a,e.reduce((b,c)=>b+c)),0);

export const part2 = (input) => 
  input.map(e=>e.reduce((b,c)=>b+c))
  .sort((a,b)=>b-a).slice(0,3).reduce((a,b)=>a+b);

export const init = (data) =>
  seperate(data).map(e=>e.map(toNum));