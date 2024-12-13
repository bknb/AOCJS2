import {log} from '#display';
import * as helper from '#helper';
import * as parser from '#parser';

const l = ['ABC','XYZ'];

export const part1 = (input) => 
  input.map(([a,b])=>
    1+b+3*(a==b||((a!=((b+1)%3))&&2)))
  .reduce((a,b)=>a+b);

export const part2 = (input) => 
  part1(input.map(([a,b])=>
    [a,(a+(b?((b-1)?1:0):2))%3]));

export const init = (data) => 
  data.split('\n').map(r=>
    r.split(' ').map((x,i)=>l[i].indexOf(x)));