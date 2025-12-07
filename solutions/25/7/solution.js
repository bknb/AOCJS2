import {debug, log, logGrid} from '#display';
import {cached} from '#helper';
import {gridify} from '#parser';

export const part1 = (g) => {
  let splits = 0;
  const cs = new Set([g[0].indexOf('S')]);
  log(cs);
  g.slice(1).forEach(r=>
    r.forEach((c,i)=>{
      if(c==='^'&&cs.has(i)) {
        splits++;
        cs.delete(i);
        cs.add(i+1).add(i-1);
      }
    }));
  return splits;
};

export const part2 = (g) => {
  const solve = cached((i,j) => {
    if (i===g.length) return 1;
    if (g[i][j]==='.') return solve(i+1,j,g);
    if (g[i][j]==='^') return solve(i+1,j-1,g)+solve(i+1,j+1,g);
  });
  return solve(1,g[0].indexOf('S'));
};

export const init = (data) => 
  (g=>g)(gridify(data));