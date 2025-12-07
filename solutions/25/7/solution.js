import {debug, log, logGrid} from '#display';
import {cached} from '#helper';
import {gridify} from '#parser';

export const part1 = ([s,g]) => {
  let splits = 0;
  const cs = new Set([s]);
  g.forEach(r=>
    r.forEach((c,i)=>{
      if(c==='^'&&cs.has(i)) {
        ++splits;
        cs.delete(i);
        cs.add(i+1).add(i-1);
      }
    }));
  return splits;
};

export const part2 = ([s,g]) => {
  const solve = cached((i,j) => {
    if (i===g.length) return 1;
    if (g[i][j]==='.') return solve(i+1,j);
    if (g[i][j]==='^') return solve(i+1,j-1)+solve(i+1,j+1);
  });
  return solve(0,s);
};

export const init = data => 
  (g=>[g.shift().indexOf('S'),g])
  (gridify(data));