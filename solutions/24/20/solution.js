import {log} from '#display';
import { allNext } from '#helper';

const threshold = 100;

export const part1 = ([s,e,grid]) => {
  const p = getPath([s],e,grid);
  const gs = p.map((x,i,arr)=>findNs(x,arr.slice(i+1))).flat();
  return gs.filter(x=>x>=threshold).length;
};

const findNs = ([x,y],p)=>
  p.map(([nx,ny],i)=>
    (nx==x&&Math.abs(ny-y)==2)||
    (ny==y&&Math.abs(nx-x)==2)?i-1:0)
    .filter(x=>x);

const getPath = (p,e,g)=> {
  let l,pl;
  do {
    l = p[p.length-1];
    if (l.every((x,i)=>x==e[i])) break;
    pl = p[p.length-2];
    p = p.concat(allNext(l,true).filter(([x,y])=>
      (!pl||!(x==pl[0]&&y==pl[1]))&&!g[x][y]));
  } while (!l.every((x,i)=>x==e[i]));
  return p;
}

export const part2 = ([s,e,grid]) => {
  const p = getPath([s],e,grid);
  const gs = p.map((x,i,arr)=>findNs2(x,arr.slice(i+1))).flat();
  //const set = [...new Set(gs)].map(x=>[x,0])
  //const all = gs.reduce((a,c)=>a.set(c,a.get(c)+1),new Map(set));
  //log([...all].sort(([a],[b])=>a-b).filter(([x])=>x>=50));
  return gs.filter(x=>x>=threshold).length;
};

const findNs2 = ([x,y],p)=>
  p.map(([nx,ny],i)=> {
    const gap = Math.abs(nx-x)+Math.abs(ny-y);
    if (gap<=20) return i+1-gap;
    return 0;
  })
    .filter(x=>x);

export const init = (data) => {
  let s,e;
  const grid = data.split('\n')
    .map((r,x)=>r.split('').map((c,y)=>{
      if (c == 'S') s = [x,y];
      if (c == 'E') e = [x,y];
      return ~~(c == '#');
    }));
  return [s,e,grid];
};