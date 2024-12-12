import {uniqChars, allNext, bordered,
        rng, count, isInCs} from '#helper';
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
        (v(ns[i])==cf)==(cf==v(ns[ni]))
        &&(cf!=v(ns[i+1])||cf!=v(ns[i]))
        ?a+1:a)
      (c*2),0))();

const fences = v=>c=>
    count(allNext(c,true),x=>v(x)!=v(c));

const getArea = (c,i,j,grid,fs) =>
  ((sij=i+','+j)=>
    (grid[i][j]==c&&!fs.has(sij)
     ?fs.add(sij)&&
     allNext([i,j],true).forEach(([x,y])=>
       getArea(c,x,y,grid,fs))
     ||fs:fs))();

const getAreas = (plants,grid)=> {
  const areas = new Map();
  plants.forEach(x=>areas.set(x,[]));
  for(let i=grid.length-1;i-->1;)
    for(let j=grid[i].length-1;j-->1;) {
      const c = grid[i][j];
      const a = areas.get(c);
      if (!a.find(isInCs(i,j)))
        a.push([...getArea(c,i,j,grid,new Set())]
        .map(v=>v.split(',')));
    }
  return areas;
}