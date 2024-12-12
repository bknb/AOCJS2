import {log} from '#display';
import {uniqChars, allNext, vec} from '#helper';
import {gridify} from '#parser';

export const part1 = ([plants,grid]) => {
  const areas = new Map();
  grid.map(r=>['#',...r,'#']);
  const hr = '#'.repeat(grid[0].length+2).split('');
  grid = [hr,...grid.map(r=>['#',...r,'#']),hr];
  plants.forEach(x=>areas.set(x,[]));
  for(let i=1;i<grid.length-1;i++)
    for(let j=1;j<grid[i].length-1;j++) {
      const ns = allNext([i,j],true);
      const c = grid[i][j];
      const a = areas.get(c);
      let na = a.find(([afs])=>afs?.some(([x,y])=>x==i&&y==j));
      if (!na) a.push(na=[
        [...getArea(c,i,j,grid,new Set())]
        .map(v=>v.split(',')),0]);
      na[1]+=ns.filter(([x,y])=>grid[x][y]!=c).length;
    }
  return [...areas.values()]
    .map(x=>x.map(y=>cost(y))
    .reduce((a,c)=>a+c))
    .reduce((a,c)=>a+c);
};

const cost = ([fs,fn])=>fs.length*fn;

const getArea = (c,i,j,grid,fs) => {
  if (grid[i][j]==c && !fs.has(i+','+j)) {
    fs.add(i+','+j);
    allNext([i,j],true)
      .forEach(([x,y])=>
        getArea(c,x,y,grid,fs));
  }
  return fs;
}

const find = (c,i,j,grid,a) => {
  const nna = c==grid[i][j+1];
  const sna = c==grid[i+1][j];
  const ns = allNext([i,j],true);
  return a.find(([afs])=>afs?.some(([x,y])=>
    ns.some(([x2,y2])=>x==x2&&y==y2)))
    ||(nna&&find(c,i,j+1,grid,a))
    ||(sna&&find(c,i+1,j,grid,a));
}

export const part2 = (input) => {
  // Write your code here
  return null;
};

export const init = (data) => 
  [uniqChars(data).filter(x=>x!='\n'),gridify(data)];