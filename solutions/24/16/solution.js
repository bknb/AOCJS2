import {log, debug} from '#display';
import {mapGrid, rng, next, mod} from '#helper';
import chalk from 'chalk';

let distS, sp;

export const part1 = ([s,e,g])=> {
  distS = getDM([s],g);
  return sp=getHeatGrid(distS,g)[e[0]][e[1]];
};

const getDM = (s,g) => {
  const ds = mapGrid(g,_=>rng(4).map(_=>Infinity));
  const vs = new Set();
  const q = [];
  s.forEach(x=>{
    q.push(x);
    set3D(ds,x,0);
  });
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
  return ds;
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

export const part2 = ([s,e,g]) => {
  if (!distS) part1([s,e,g]);
  log('distS finished');
  const distE = getDM([[...e,3]],g);
  log('distE finished');
  let sum = 0, all=[];
  for (let i=distS.length;i-->0;)
    for (let j=distS[0].length;j-->0;)
      for (let k=distS[0][0].length;k-->0;) {
        if (distS[i][j][k]+distE[i][j][mod(k+2,4)]==sp)
          all.push([i,j,k]);
      }
  return new Set(all.map(([x,y])=>(x+','+y))).size;
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