import {log, logGrid, debug} from '#display';
import {rng, mod} from '#helper';

//const [w,h] = [101,103];
const [w,h] = [101,103];
const times = 100;


export const part1 = (input) => {
  const rs=input.map(([x,y,dx,dy])=>{
    x += dx*times;
    y += dy*times;
    x=mod(x,w);
    y=mod(y,h);
    return [x,y];
  });
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

export const part2 = (input) => {
  let rs=input;
  let t=0;
  while (rs.some(([x,y],i,arr)=>
    arr.slice(i+1).some(([x2,y2])=>x2==x&&y2==y))) {
    rs=input.map(([x,y,dx,dy])=>{
      x += dx;
      y += dy;
      x=mod(x,w);
      y=mod(y,h);
      return [x,y,dx,dy];
    });
    t++;
  }
  log(rs);
  return t;
};

export const init = (data) => 
  data.split('\n').map(r=>r.match(/[-\d]+/g).map(x=>+x))