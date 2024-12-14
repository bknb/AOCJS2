import {mod} from '#helper';
import {isTest} from '#solver';

let w,h,wh,hh;

export const part1 = input=>
  solve(input,100)
    .reduce(([a,b,c,d],[x,y])=>
      (x<wh?
       (y<hh?
        [++a,b,c,d]
        :y>hh&&
        [a,b,++c,d])
       :x>wh&&
       (y<hh?
        [a,++b,c,d]
        :y>hh&&
        [a,b,c,++d]))
      ||[a,b,c,d],[0,0,0,0])
    .reduce((a,b)=>a*b);

const solve = (input, times) =>
  input.map(([x,y,dx,dy])=>
    [mod(x+dx*times,w),mod(y+dy*times,h)]);

export const part2 = input=>
  recPart2(input,1)

const recPart2 = (input,t) =>
  solve(input,t).some(([x,y],i,arr)=>
    arr.slice(i+1).some(([x2,y2])=>x2==x&&y2==y))
  &&(recPart2(input,++t)||t);

export const init = (data) =>
  ([w,h]=isTest()?[11,7]:[101,103])
    &&([wh,hh]=[w>>1,h>>1])
    &&data.split('\n').map(r=>
      r.match(/[-\d]+/g).map(x=>+x));