import {
  sumGrid, oob, mapGrid,
  allNext, zeroGrid, altGrid} from '#helper';

const dirMap = '^>v<';
const dirD = allNext([0,0])
  .filter((x,i)=>i%2);

const getStart = (input) => 
  input.reduce((a,r,i)=>
    a||r.slice().reduce((b,c,j,arr)=>
      (fi=>fi!=-1&&arr.splice(1)&&[i,j,fi])
      (dirMap.indexOf(c)),false),false);

const next = ([x,y,d]) =>
  (([dx,dy])=>[x+dx,y+dy])(dirD[d]);

const turnR = ([x,y,d]) =>
  [x,y,(d+1)%4];

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
        const obsn = obs.map(r=>r.slice());
        obsn[i][j]=true;
        loops+=isLoop([...s],obsn,vis.map(r=>r.slice()));
      }
  return loops;
}

export const init = (data) =>
  (grid=>[
    getStart(grid),
    grid.map(r=>r.map(c=>c=='#'))
  ])(data.split('\n').map(x=>x.split('')));