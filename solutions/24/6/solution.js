import {
  sumGrid, oob, allNext,
  mapGrid, zeroGrid, altGrid} from '#helper';

const dirMap = '^>v<';
const dirD = allNext([0,0])
  .filter((x,i)=>i%2);

export const part1 = ([s,obs]) => 
  sumGrid(mapGrid(solve(
    s,getVis(s,obs),obs),c=>!!c));

export const part2 = ([s,obs]) =>
  sumGrid(mapGrid(obs,(c,i,j)=>
    !c && isLoop(
      s.slice(),getVis(s,obs),
      altGrid(obs,i,j,true,true))));

export const init = (data) =>
  (grid=>[
    getStart(grid),
    grid.map(r=>r.map(c=>c=='#'))
  ])(data.split('\n').map(x=>x.split('')));

const solve = (s, vis, obs) => {
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

const isLoop = (s, vis, obs) => {
  while(true) {
    let [nx,ny] = next(s);
    if (oob(nx,ny,obs)) return false;
    if (obs[nx][ny]) s=turnR(s);
    else {
      s=move(s,nx,ny);
      if(vis[nx][ny]==s[2]+1) return true;
      vis[nx][ny]=s[2]+1;
    }
  }
}

const getStart = (input) => 
  input.reduce((a,r,i)=>
    a||r.slice().reduce((b,c,j,arr)=>
      (fi=>fi!=-1&&arr.splice(1)&&[i,j,fi])
      (dirMap.indexOf(c)),false),false);

const getVis = (s, obs) =>
  (([x,y,d])=>altGrid(zeroGrid(obs),x,y,d+1))(s);

const next = ([x,y,d]) =>
  (([dx,dy])=>[x+dx,y+dy])(dirD[d]);

const turnR = ([x,y,d]) =>
  [x,y,(d+1)%4];

const move = ([,,d],x,y) => [x,y,d];