import {allPerms} from '#helper';

const multiply2020Sum = n=>input=>
  allPerms(input,n)
  .find(x=>x.reduce((a,c)=>a+c)==2020)
  .reduce((a,c)=>a*c);

export const part1 = (input) =>
  multiply2020Sum(2)(input);

export const part2 = (input) =>
  multiply2020Sum(3)(input);

export const init = (data) =>
  data.split('\n').map(x=>+x);