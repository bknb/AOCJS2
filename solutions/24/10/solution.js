import {mapGrid, sumGrid, allNext,oob} from '#helper';
import {gridWise, toNum} from '#parser';

export const part1 = (input) => 
  trailHead(input,true);

export const part2 = (input) => 
  trailHead(input,false);

export const init = (data) => 
  gridWise(toNum)(data);

const trailHead = (grid,f) =>
  sumGrid(mapGrid(grid,(c,x,y)=>
    c==0?countTH(0,[[x,y]],grid,f).length:0));

const countTH = (c,l,grid,f) =>
  c==9?l:countTH(
    c+1,nextLayer(
      l.map(([x,y])=>
        stepUp(c,x,y,grid))
      .flat(),f),grid,f);

const nextLayer = (su,f) =>
  !f?su:su.filter(([a,b],i,arr)=>!arr.slice(0,i)
    .some(([c,d])=>a==c&&b==d));

const stepUp = (c, x, y, grid) => 
  allNext([x,y])
    .filter((_,i)=>!(i%2))
    .filter(x=>!oob(...x,grid))
    .filter(([x,y])=>grid[x][y]==c+1);