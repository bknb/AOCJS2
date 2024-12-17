import {log, debug} from '#display';
import {mapGrid, rng, next, mod, visGrid} from '#helper';
import chalk from 'chalk';

export const part1 = ([s,e,g])=> {
  const ds = mapGrid(g,_=>rng(4).map(_=>Infinity));
  set3D(ds,s,0);
  const vs = new Set();
  set3D(ds,s,0);
  const q = [s];
  let c;
  while (c=rmNearest(ds,q)) {
    const ns = nexts(c,g);
    const cw = get3D(ds,c);
    ns.forEach(([n,nw])=> {
      const w = cw+nw;
      if (get3D(ds,n)>w) set3D(ds,n,w);
      vs.add(c.join(','));
      if (!vs.has(n.join(',')))
        q.push(n);
    });
  }
  return getHeatGrid(ds,g)[e[0]][e[1]];
}

const rmNearest = (ds,q) => {
  if (!q.length) return;
  const min = q.map(c=>get3D(ds,c)).reduce((a,c)=>Math.min(a,c));
  return q.splice(q.findIndex(c=>get3D(ds,c)==min),1)[0];
}

const getHeatGrid = (ds,g)=> {
  const heatGrid = mapGrid(ds,(d,i,j)=>
    !g[i][j]&&d.reduce((a,c)=>Math.min(a,c)));
  const max = heatGrid.reduce((a,c)=>
    Math.max(a,c.reduce((b,d)=>
      Math.max(b,d))),0);
  debug(heatGrid.map(r=>r.map(c=>
    c!==false?heat(c,max)('▒')
    :'.').join('')).join('\n'));
  return heatGrid;
}

const heat = (c,m,w=c/m) =>
  chalk.rgb((255*w)|0,(255*(1-w))|0,0);

const nexts = (k,g)=> {
  const [,,d] = k;
  const left = k.slice();
  left[2] = mod(d-1,4);
  const right = k.slice();
  right[2] = mod(d+1,4);
  const ns = [[left,1000],[right,1000]];
  const [nx,ny] = next(k,true);
  if (!g[nx][ny])
    ns.push([[nx,ny,d],1]);
  return ns;
}

const set3D = (grid, [x,y,z], val) =>
  grid[x][y][z]=val;

const get3D = (grid, [x,y,z]) =>
  grid[x][y][z];

export const part2 = (input) => {
  // Write your code here
  return null;
};

export const init = (data) => {
  let s,e;
  const grid = data.split('\n')
    .map((r,x)=>r.split('').map((c,y)=>{
      if (c == 'S') s = [x,y,1];
      if (c == 'E') e = [x,y];
      return ~~(c == '#');
    }));
  return [s,e,grid];
};