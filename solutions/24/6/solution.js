import {sumGrid, oob, mapGrid, allNext, zeroGrid, altGrid} from '#helper';

const dirMap = '^>v<';
const dirD = allNext([0,0])
  .filter((x,i)=>i%2);

const getStart = (input) => {
  for(let i=input.length;i-->0;)
    for(let j=input[i].length;j-->0;)
      if(/[\^>v<]/.test(input[i][j]))
        return [i,j,dirMap.indexOf(input[i][j])];
}

const next = ([x,y,d]) =>
  (([dx,dy])=>[x+dx,y+dy])(dirD[d]);

const turnR = ([x,y,d]) =>
  [x,y,(d+1)%4];

const visit = (vis, x, y) =>
  vis[x][y]=true&&vis;

const solve = (s, obs, vis) =>
  (([nx,ny])=>
    (oob(nx,ny,obs)?vis
    :(obs[nx][ny]
      ?solve(turnR(s),obs,vis)
      :solve([nx,ny,s[2]],obs,visit(vis,nx,ny)))))
    (next(s))

const solveIt1 = (s, obs, vis) => {
  while(true) {
    let [nx,ny] = next(s);
    if (oob(nx,ny,obs)) return vis;
    if (obs[nx][ny]) s=turnR(s);
    else {
      s[0]=nx;s[1]=ny;
      vis[nx][ny]=s[2]+1;
    }
  }
}

export const part1 = ([s,obs]) => 
  sumGrid(mapGrid(solveIt1(
    s,obs,getVis(s,obs)),c=>!!c));

const isLoop = (s, obs, vis) => {
  while(true) {
    let [nx,ny] = next(s);
    if (oob(nx,ny,obs)) return false;
    if (obs[nx][ny]) s=turnR(s);
    else {
      s[0]=nx;s[1]=ny;
      if(vis[nx][ny]==s[2]+1) return true;
      vis[nx][ny]=s[2]+1;
    }
  }
}

const getVis = (s, obs) =>
  (([x,y,d])=>altGrid(zeroGrid(obs),x,y,d+1))(s);

export const part2 = ([s,obs]) => {
  const vis = getVis(s,obs);
  let loops = 0;
  for(let i=obs.length;i-->0;)
    for(let j=obs[i].length;j-->0;)
      if(!obs[i][j]) {
        const obsn = obs.map(r=>[...r]);
        obsn[i][j]=true;
        loops+=isLoop([...s],obsn,vis.map(r=>[...r]));
      }

  return loops;
}

export const init = (data) =>
  (grid=>[
    getStart(grid),
    grid.map(r=>r.map(c=>c=='#'))
  ])(data.split('\n').map(x=>x.split('')));