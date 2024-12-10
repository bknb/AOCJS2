import {mapGrid, sumGrid, allNext,oob} from '#helper';
import {gridWise, toNum} from '#parser';

export const part1 = (input) => 
  sumGrid(mapGrid(mapGrid(input,trailHead),c=>c.length));

const trailHead = (c,x,y,grid) =>
  c==0?countTH(0,[[x,y]],grid):[];

const trailRating = (c,x,y,grid) =>
  c==0?countTH2(0,[[x,y]],grid):[];

const countTH2 = (c,l,grid) =>
  c==9?l:countTH2(c+1,
  l.map(([x,y])=>stepUp(c,x,y,grid)).flat(),grid);

const countTH = (c,l,grid) =>
  c==9?l:countTH(c+1,
  l.map(([x,y])=>stepUp(c,x,y,grid)).flat()
    .filter(([a,b],i,arr)=>
      !arr.slice(0,i).some(([c,d])=>a==c&&b==d)),grid);

const stepUp = (c, x, y, grid) => 
  allNext([x,y])
    .filter((_,i)=>!(i%2))
    .filter(x=>!oob(...x,grid))
    .filter(([x,y])=>grid[x][y]==c+1);

export const part2 = (input) => 
  sumGrid(mapGrid(mapGrid(input,trailRating),c=>c.length));

export const init = (data) => 
  gridWise(toNum)(data)