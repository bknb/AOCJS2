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
  (grid=>grid[x][y]=v&&grid)
  (c?grid.map(x=>x.slice()):grid);

export const zeroGrid = (grid) =>
  grid.map(x=>x.map(y=>0));

export const getNext = (c,dir) => {
  switch(dir) {
    case 0: c[1]--; case 1: c[0]--; break;
    case 2: c[0]--; case 3: c[1]++; break;
    case 4: c[1]++; case 5: c[0]++; break;
    case 6: c[0]++; case 7: c[1]--; break;
  }
  return c;
};

export const allNext = (c) =>
  rng(0,8).map(x=>getNext(c.slice(),x));