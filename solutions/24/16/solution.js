import {mapGrid, rng, next,
        mod, insertSorted} from '#helper';

let distS, sp;

export const part1 = ([s,e,g])=> {
  distS = getDM([s],g);
  return sp=distS[e[0]][e[1]]
    .reduce((a,c)=>Math.min(a,c));
};

export const part2 = ([s,e,g]) => {
  if (!distS) part1([s,e,g]);
  const distE = getDM(rng(4).map(d=>[...e,d]),g);
  let sum = 0, all=[];
  for (let i=distS.length;i-->0;)
    for (let j=distS[0].length;j-->0;)
      for (let k=distS[0][0].length;k-->0;)
        if (distS[i][j][k]+distE[i][j][mod(k+2,4)]==sp)
          all.push([i,j,k]);
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

const getDM = (s,g) => {
  const ds = mapGrid(g,_=>
    rng(4).map(_=>Infinity));
  const vs = new Set();
  let q = [];
  s.forEach(x=>{
    q.push(x);
    set3D(ds,x,0);
  });
  let c;
  while (c=q.pop()) {
    const ns = nexts(c,g);
    const cw = get3D(ds,c);
    ns.forEach(([n,nw])=> {
      const w = cw+nw;
      if (get3D(ds,n)>w) set3D(ds,n,w);
      vs.add(c.join(','));
      if (!vs.has(n.join(',')))
        q=insertSorted(q,n,(a,b)=>
          get3D(ds,a)-get3D(ds,b));
    });
  }
  return ds;
}

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