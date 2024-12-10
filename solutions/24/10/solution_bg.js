import {spreadBG,countBG,rng,toSingleBG} from '#helper';
import {bgify} from '#parser';

export const part1 = ([input,w,h]) =>
  toSingleBG(input[0],w,h).map(start=>
    input.slice(1).reduce((a,c)=>
      spreadBG(a,w,h)&c,start))
    .map(n=>countBG(n,w,h))
    .reduce((a,c)=>a+c);

export const part2 = ([input,w,h]) => null;

export const init = (data) => 
  bgify(data,rng(0,10));