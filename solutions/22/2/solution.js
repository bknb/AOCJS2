import {log} from '#display';
import * as helper from '#helper';
import * as parser from '#parser';

const l1 = 'ABC';
const l2 = 'XYZ';

export const part1 = (input) => 
  input.map(([a,b])=>
    ((ai=l1.indexOf(a),bi=l2.indexOf(b))=>
      1+bi+3*(ai==bi||((ai!=((bi+1)%3))&&2)))())
  .reduce((a,b)=>a+b);

export const part2 = (input) => 
  part1(input.map(([a,b])=>
    ((ai=l1.indexOf(a),bi=l2.indexOf(b))=>
      [a,l2[(ai+(bi?((bi-1)?1:0):2))%3]])()));

export const init = (data) => 
  data.split('\n').map(r=>r.split(' '));