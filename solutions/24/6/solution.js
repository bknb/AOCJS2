import {
  sumGrid, oob, getStart,
  mapGrid, zeroGrid, altGrid,
  turn, move, next
} from '#helper';

import {gridify} from '#parser';

export const part1 = ([s,obs]) => 
  sumGrid(mapGrid(getAllVis(
    s,getVis(s,obs),obs),c=>!!c));

export const part2 = ([s,obs]) =>
  sumGrid(mapGrid(obs,(c,i,j)=>
    !c && !getAllVis(
      s.slice(),getVis(s,obs),
      altGrid(obs,i,j,true,true))));

export const init = (data) =>
  (grid=>[
    getStart(grid),
    mapGrid(grid,c=>c=='#')
  ])(gridify(data));

const getAllVis = (s, vis, obs) => {
  while(true) {
    let [nx,ny] = next(s);
    if (oob(nx,ny,obs)) return vis;
    if (obs[nx][ny]) s=turnR(s);
    else {
      s=move(s,nx,ny);
      if(vis[nx][ny]==s[2]+1) return false;
      vis[nx][ny]=s[2]+1;
    }
  }
}

const getVis = (s, obs) =>
  (([x,y,d])=>altGrid(zeroGrid(obs),x,y,d+1))(s);

const turnR = s=>turn(s,2);