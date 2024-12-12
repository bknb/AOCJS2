import {log} from '#display';
import {uniqChars, allNext, vec} from '#helper';
import {gridify} from '#parser';

export const part1 = ([plants,grid]) => {
  grid.map(r=>['#',...r,'#']);
  const hr = '#'.repeat(grid[0].length+2).split('');
  grid = [hr,...grid.map(r=>['#',...r,'#']),hr];
  const areas = getAreas(plants,grid);
  return [...areas.values()]
    .map(x=>x.map(costPeri(grid))
    .reduce((a,c)=>a+c))
    .reduce((a,c)=>a+c);
};

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

export const part2 = (input) => {
  // Write your code here
  return null;
};

export const init = (data) => 
  [uniqChars(data).filter(x=>x!='\n'),gridify(data)];