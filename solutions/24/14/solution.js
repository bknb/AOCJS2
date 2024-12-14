import {log, debug} from '#display';
import {mod} from '#helper';
import {isTest} from '#solver';

let w,h;

export const part1 = (input) => {
  const rs=solve(input,100);
  const wh = w>>1;
  const hh = h>>1;
  return debug(rs.reduce(([a,b,c,d],[x,y])=>{
    if (x<wh) {
      if (y<hh) return [a+1,b,c,d];
      else if (y>hh) return [a,b,c+1,d];
    } else if (x>wh) {
      if (y<hh) return [a,b+1,c,d];
      else if (y>hh) return [a,b,c,d+1];
    }
    return [a,b,c,d];
  },[0,0,0,0])).reduce((a,b)=>a*b);
};

const solve = (input, times) =>
  input.map(([x,y,dx,dy])=>{
    x += dx*times;
    y += dy*times;
    x=mod(x,w);
    y=mod(y,h);
    return [x,y];
  });

export const part2 = (input) => {
  let t=0;
  let rs=input;
  while (rs.some(([x,y],i,arr)=>
    arr.slice(i+1).some(([x2,y2])=>x2==x&&y2==y))) {
    rs=solve(input,++t);
  }
  return t;
};

export const init = (data) => {
  [w,h] = isTest()?[11,7]:[101,103];
  return data.split('\n').map(r=>r.match(/[-\d]+/g).map(x=>+x));
}