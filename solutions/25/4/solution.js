import {mapGrid, sumGrid, allNext} from '#helper';
import {gridWise} from '#parser';

const h = (g,r) => 
  mapGrid(g,(c,i,j) =>
    c && fa(i,j,g)!=!!r);

const fa = (i,j,g) =>
  allNext([i,j]).reduce((s,[x,y])=>
      s+~~g?.[x]?.[y],0)<4;

export const part1 = (g) =>
  sumGrid(h(g));

export const part2 = (g) => {
  let s = sumGrid(g), o = s;
  do g=h(g,true);
  while(o-(o=sumGrid(g)));
  return s-o;
}

export const init = (data) =>
  gridWise(c=>c==='@')(data);