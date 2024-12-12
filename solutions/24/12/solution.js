import {log} from '#display';
import {uniqChars, allNext, bordered, rng} from '#helper';
import {gridify} from '#parser';

export const part1 = ([plants,grid]) => 
  solve(plants,grid,costPeri(grid))

export const part2 = ([plants,grid]) => 
  solve(plants,grid,costSides);

const solve = (plants,grid,costFn) =>
  [...getAreas(plants,grid).values()]
    .map(x=>x.map(costFn)
    .reduce((a,c)=>a+c))
    .reduce((a,c)=>a+c);

export const init = (data) => 
  [uniqChars(data).filter(x=>x!='\n'),
   bordered(gridify(data))];

const costSides = fs=> {
  const isin=([i,j])=>fs.some(([x,y])=>i==x&&j==y);
  const sides = fs.map(c=>
    ((ns=allNext(c))=>
      rng(0,4).reduce((a,c)=>
        ((i,ni=(i+2)%8)=>(isin(ns[i])
          ?(isin(ns[ni])&&!isin(ns[i+1]))
          :!isin(ns[ni]))?a+1:a)
        (c*2),0))()).reduce((a,c)=>a+c);
  return fs.length*sides;
}

const costPeri = grid=>fs=> {
  const fences = fs.map(([i,j])=>
    allNext([i,j],true).filter(([x,y])=>
      grid[i][j]!=grid[x][y]).length)
    .reduce((a,c)=>a+c);
  return fs.length*fences;
}

const getArea = (c,i,j,grid,fs) => {
  const sij=i+','+j;
  if (grid[i][j]==c && !fs.has(sij)) {
    fs.add(sij);
    allNext([i,j],true)
      .forEach(([x,y])=>
        getArea(c,x,y,grid,fs));
  }
  return fs;
}

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