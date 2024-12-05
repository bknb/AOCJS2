import {allPairs, allPerms} from '#helper';

export const part1 = (input) =>
  allPairs(input)
  .find(([a,b])=>a+b==2020)
  .reduce((a,c)=>a*c);

export const part2 = (input) =>
  allPerms(input,3)
  .find(x=>x.reduce((a,c)=>a+c)==2020)
  .reduce((a,c)=>a*c);

export const init = (data) =>
  data.split('\n').map(x=>+x);