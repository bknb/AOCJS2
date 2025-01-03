import {rng} from './array.js';

export const getEdges = (i,j,input) =>
  allNext([i,j],false).map(([x,y])=>input[x][y]);

export const mapGrid = (input, func) =>
  input.map((x,i)=>
    x.map((y,j)=>
      func(y,i,j,input)));

export const eachGrid = (input, func) =>
  input.forEach((x,i)=>
    x.forEach((y,j)=>
      func(y,i,j,input)));

export const sumGrid = (grid) =>
  grid.reduce((a,c)=>
    (a+c.reduce((a,c)=>
      a+c,0)),0);

export const isXYInCoordinates = (i,j)=>
  cs=>cs.some(([x,y])=>x==i&&y==j);

export const oob = (x,y,grid) =>
  grid[x]?.[y]===undefined;

export const altGrid = (grid, x, y, v, c) =>
  (aGrid=>aGrid[x][y]=v&&aGrid)
  (c?grid.map(x=>x.slice()):grid);

export const zeroGrid = (grid) =>
  grid.map(x=>x.map(y=>0));

export const copyGrid = (grid) =>
  grid.map(x=>x.slice());

export const bordered = (grid) =>
  (hr=>[hr,...grid.map(r=>['#',...r,'#']),hr])
  ('#'.repeat(grid[0].length+2).split(''));

export const getNext = (c,dir) => {
  switch(dir) {
    case 7: c[1]--; case 0: c[0]--; break;
    case 1: c[0]--; case 2: c[1]++; break;
    case 3: c[1]++; case 4: c[0]++; break;
    case 5: c[0]++; case 6: c[1]--; break;
  }
  return c;
};

export const getG = (x,g)=>
  x.reduce((a,c)=>a[c],g);

export const allNext = (c=[0,0],oa) =>
  (dirs=>dirs.map(x=>getNext(c.slice(),x)))
  (rng(0,8).filter((_,i)=>i%2!=oa));

export const next = ([x,y,d],oa) =>
  ((cd,[dx,dy]=dirD[cd])=>[x+dx,y+dy])
  (oa===true?d*2:oa===false?d*2+1:d);
export const turn = ([x,y,d],c=1) => [x,y,(d+c)%8];
export const move = ([,,d],x,y) => [x,y,d];

export const getStart = (input, dirMap='^ > v <') => 
  input.reduce((a,r,i)=>
    a||r.slice().reduce((b,c,j,arr)=>
      (fi=>fi!=-1&&arr.splice(1)&&[i,j,fi])
      (dirMap.indexOf(c)),false),false);

export const visGrid = (map='.#')=>grid=>
  grid.map(row=>gridRow(row,map)).join('\n')

const gridRow = (row,map)=>
  row.map(x=>map[x|0]||'#').join('');

const dirD = allNext();