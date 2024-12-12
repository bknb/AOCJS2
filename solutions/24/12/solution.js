import {log} from '#display';
import {uniqChars, allNext, bordered} from '#helper';
import {gridify} from '#parser';

export const part1 = ([plants,grid]) => {
  const areas = getAreas(plants,grid);
  return [...areas.values()]
    .map(x=>x.map(costPeri(grid))
    .reduce((a,c)=>a+c))
    .reduce((a,c)=>a+c);
};

export const part2 = ([plants,grid]) => {
  const areas = getAreas(plants,grid);
  return [...areas.values()]
    .map(x=>x.map(costSides)
    .reduce((a,c)=>a+c))
    .reduce((a,c)=>a+c);
};

export const init = (data) => 
  [uniqChars(data).filter(x=>x!='\n'),
   bordered(gridify(data))];

const costSides = fs=> {
  const isin=([i,j])=>fs.some(([x,y])=>i==x&&j==y);
  const sides = fs.map(c=> {
    const ns = allNext(c);
    let r = 0;
    if(!isin(ns[0])&&!isin(ns[2])) r++;
    if(isin(ns[0])&&isin(ns[2])&&!isin(ns[1])) r++;
    if(!isin(ns[2])&&!isin(ns[4]))r++;
    if(isin(ns[2])&&isin(ns[4])&&!isin(ns[3])) r++;
    if(!isin(ns[4])&&!isin(ns[6]))r++;
    if(isin(ns[4])&&isin(ns[6])&&!isin(ns[5])) r++;
    if(!isin(ns[6])&&!isin(ns[0])) r++;
    if(isin(ns[6])&&isin(ns[0])&&!isin(ns[7])) r++;
    return r;
  }).reduce((a,c)=>a+c);
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
  if (grid[i][j]==c && !fs.has(i+','+j)) {
    fs.add(i+','+j);
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