import {log,logGrid} from '#display';
import {mapGrid, sumGrid, allNext,oob} from '#helper';
import {gridWise, toNum} from '#parser';
import chalk from 'chalk';

export const part1 = (input) => 
  sumGrid(mapGrid(mapGrid(input,trailHead),c=>c.length));

const trailHead = (c,x,y,grid) =>
  c==0?countTH(0,[[x,y]],grid):[];

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

export const part2 = (input) => {
  // Write your code here
  return null;
};

export const init = (data) => 
  gridWise(toNum)(data)