import {cached} from '#helper';
import {gridify} from '#parser';

export const part1 = ([s,g]) => 
  (cs=>g.reduce((ts,r)=>
    r.reduce((s,c,i)=>
      (cs.has(i)&&c==='^'
        &&cs.delete(i)
        &&cs.add(i+1).add(i-1)
        &&s+1)||s,0)+ts,0))
  (new Set([s]));

export const part2 = ([s,g],l=g.length) => 
  ((solve=cached((i,j) => 
    i==l?1:(g[i][j]=='.'?solve(i+1,j)
      :solve(i+1,j-1)+solve(i+1,j+1)))) =>
    solve(0,s))();

export const init = data => 
  (g=>[g.shift().indexOf('S'),g])
  (gridify(data));