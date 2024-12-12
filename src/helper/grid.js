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
      (a+c),0)),0);

export const isInCs = (i,j)=>
  cs=>cs.some(([x,y])=>x==i&&y==j);

/**
 * Returns if given coordinates [i,j] are out
 * bounds of the given grid.
 * 
 * @param {number} x
 *   - x coordinate.
 * @param {number} y
 *   - y coordinate.
 * @param {number[][]} grid
 *   - The grid to check.
 */
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

/**
 * Gets the the coordinate of the next coordinate
 * in a grid. Given a direction dir which means 0 for north
 * going to 7 north-west clockwise.
 * 
 * @param {number[]} c
 *   - The coordinate from which to start.
 * @param {number} dir
 *   - The direction to get the next coordinate from
 */
export const getNext = (c,dir) => {
  switch(dir) {
    case 7: c[1]--; case 0: c[0]--; break;
    case 1: c[0]--; case 2: c[1]++; break;
    case 3: c[1]++; case 4: c[0]++; break;
    case 5: c[0]++; case 6: c[1]--; break;
  }
  return c;
};

/**
 * Gets the the coordinate of the next coordinate
 * in a grid. Given a direction dir which means 0 for north
 * going to 7 north-west clockwise.
 * 
 * @param {number[]} c
 *   - The coordinate from which to start.
 * @param {boolean} oa
 *   - (Only Axis) filters only axis directions for true and
 *     diagonals for true. 'undefined' (default) gives all directions.
 */
export const allNext = (c=[0,0],oa) =>
  (dirs=>dirs.map(x=>getNext(c.slice(),x)))
  (rng(0,8).filter((_,i)=>i%2!=oa));


export const next = ([x,y,d]) =>
  (([dx,dy])=>[x+dx,y+dy])(dirD[d]);
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