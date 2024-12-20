import { allNext, eq, getG } from '#helper';

const threshold = 100;

export const part1 = p => solve(p,2);

export const part2 = p => solve(p,20);

export const init = data => {
  let s,e;
  const grid = data.split('\n')
    .map((r,x)=>r.split('').map((c,y)=>{
      if (c=='S') s=[x,y];
      if (c=='E') e=[x,y];
      return ~~(c!='#');
    }));
  return getPath([s],e,grid);
};

const solve = (path,upTo)=>
  path.map((x,i,arr)=>
    cheats(x,arr.slice(i+1),upTo))
  .flat().filter(x=>x>=threshold).length;

const cheats = ([x,y],restPath,upTo)=>
  restPath.map(([nx,ny],i)=>
    ((gap=Math.abs(nx-x)+Math.abs(ny-y))=>
      gap<=upTo?i+1-gap:0)()).filter(x=>x);

const getPath = (path,end,grid)=> {
  let l,c,n;
  do {
    [c,l] = path;
    n = allNext(c,true).filter(x=>
      (!l||!eq(x,l))&&getG(x,grid))[0];
    path.unshift(n);
  } while (!eq(n,end));
  return path;
}