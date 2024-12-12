import {log} from '#display';
import {uniqChars, allNext, bordered, rng, count} from '#helper';
import {gridify} from '#parser';

export const part1 = (input) => 
  solve(input,fences)

export const part2 = (input) => 
  solve(input,corners);

const solve = ([plants,grid],countFn) =>
  [...getAreas(plants,grid).values()]
    .map(x=>x.map(cost(countFn,([x,y])=>grid[x][y]))
    .reduce((a,c)=>a+c))
    .reduce((a,c)=>a+c);

export const init = (data) => 
  [uniqChars(data).filter(x=>x!='\n'),
   bordered(gridify(data))];

const cost = (fn,v)=>fs=>
  fs.length*fs.map(fn(v))
    .reduce((a,c)=>a+c);;

const corners = v=>x=>
  ((ns=allNext(x),cf=v(x))=>
    rng(0,4).reduce((a,c)=>
      ((i,ni=(i+2)%8)=>
        (v(ns[i])!=cf)==(v(ns[ni])!=cf)
        &&(cf!=v(ns[i+1])||v(ns[i])!=cf)
        ?a+1:a)
      (c*2),0))();

const fences = v=>c=>
    count(allNext(c,true),x=>v(x)!=v(c));

const getArea = (c,i,j,grid,fs) =>
  ((sij=i+','+j)=>
    (grid[i][j]==c&&!fs.has(sij)
     ?fs.add(sij)
     &&allNext([i,j],true)
     .forEach(([x,y])=>
       getArea(c,x,y,grid,fs))
     ||fs:fs))();

const getAreas = (plants,grid)=> {
  const areas = new Map();
  plants.forEach(x=>areas.set(x,[]));
  for(let i=1;i<grid.length-1;i++)
    for(let j=1;j<grid[i].length-1;j++) {
      const c = grid[i][j];
      const a = areas.get(c);
      let na = a.find((afs)=>afs.some(([x,y])=>x==i&&y==j));
      if (!na) a.push(na=
        [...getArea(c,i,j,grid,new Set())]
        .map(v=>v.split(',')));
    }
  return areas;
}