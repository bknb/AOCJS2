import { allNext } from '#helper';

const threshold = 100;

export const part1 = (p) => solve(p,2);

export const part2 = (p) => solve(p,20);

export const init = (data) => {
  let s,e;
  const grid = data.split('\n')
    .map((r,x)=>r.split('').map((c,y)=>{
      if (c == 'S') s = [x,y];
      if (c == 'E') e = [x,y];
      return ~~(c == '#');
    }));
  return getPath([s],e,grid);
};

const solve = (p,pss)=>
  p.map((x,i,arr)=>
    cheats(x,arr.slice(i+1),pss))
  .flat().filter(x=>x>=threshold).length;

const cheats = ([x,y],p,ut)=>
  p.map(([nx,ny],i)=> {
    const gap = Math.abs(nx-x)+Math.abs(ny-y);
    if (gap<=ut) return i+1-gap;
    return 0;
  }).filter(x=>x);


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