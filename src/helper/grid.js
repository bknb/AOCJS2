import {rng} from './array.js';

export const getEdges = (i,j,input) =>
  [0,1].map(x=>[0,1].map(y=>
    input[i+(x?1:-1)][j+(y?1:-1)])).flat();

export const mapGrid = (input, func) =>
  input.map((x,i)=>
    x.map((y,j)=>
      func(y,i,j,input)));

export const sumGrid = (grid) =>
  grid.reduce((a,c)=>
    (a+c.reduce((a,c)=>
      (a+c),0)),0);

export const oob = (i,j,grid) =>
  grid[i]?.[j]===undefined;

export const altGrid = (grid, x, y, v, c) =>
  (aGrid=>aGrid[x][y]=v&&aGrid)
  (c?grid.map(x=>x.slice()):grid);

export const zeroGrid = (grid) =>
  grid.map(x=>x.map(y=>0));

export const copyGrid = (grid) =>
  grid.map(x=>x.slice());

export const getNext = (c,dir) => {
  switch(dir) {
    case 7: c[1]--; case 0: c[0]--; break;
    case 1: c[0]--; case 2: c[1]++; break;
    case 3: c[1]++; case 4: c[0]++; break;
    case 5: c[0]++; case 6: c[1]--; break;
  }
  return c;
};

export const allNext = (c) =>
  rng(0,8).map(x=>getNext(c.slice(),x));

export const next = ([x,y,d]) =>
  (([dx,dy])=>[x+dx,y+dy])(dirD[d]);

export const turn = ([x,y,d],c=1) => [x,y,(d+c)%8];
export const move = ([,,d],x,y) => [x,y,d];

export const getStart = (input, dirMap='^ > v <') => 
  input.reduce((a,r,i)=>
    a||r.slice().reduce((b,c,j,arr)=>
      (fi=>fi!=-1&&arr.splice(1)&&[i,j,fi])
      (dirMap.indexOf(c)),false),false);

const dirD = allNext([0,0]);