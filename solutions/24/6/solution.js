import {logGrid, log} from '#display';
import {sumGrid, oob} from '#helper';
import chalk from 'chalk';

const dirMap = '^>v<';
const dirD = [[-1,0],[0,1],[1,0],[0,-1]];

const printMap = [
  '.',
  chalk.red('↑'),
  chalk.red('→'),
  chalk.green('↓'),
  chalk.green('←'),
  chalk.blue('↻')
];

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
const oppo = (d) => (d+2)%4

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
      vis[nx][ny]=true;
    }
  }
}

export const part1 = (input) => {
  let s = getStart(input);
  const obs = input.map(r=>r.map(c=>c=='#'));
  const vis = input.map(r=>r.map(c=>/[\^>v<]/.test(c)));
  const sol = solveIt1(s,obs,vis);
  return sumGrid(sol);
}

const solveIt2 = (s, obs, vis) => {
  let loops = 0;
  while(true) {
    let [nx,ny] = next(s);
    if (oob(nx,ny,obs)) return loops;
    if (obs[nx][ny]) {
      vis[s[0]][s[1]]=5;
      s=turnR(s);
      markToN(s,obs,vis);
    }
    else {
      s[0]=nx;s[1]=ny;
      if(vis[nx][ny]==turnR(s)[2]+1) {
        loops++;
      }
      vis[nx][ny]=s[2]+1;
    }
  }
}

export const markToN = ([x,y,d], obs, vis) => {
  const od = oppo(d);
  while(!oob(x,y,obs)&&!obs[x][y]) {
    if(!vis[x][y]) vis[x][y]=d+1;
    [x,y] = next([x,y,od]);
  }
}

export const part2 = (input) => {
  let s = getStart(input);
  const obs = input.map(r=>r.map(c=>c=='#'));
  const vis = input.map(r=>r.map(c=>/[\^>v<]/.test(c)?s[2]+1:0));
  markToN(s,obs,vis);
  const sol = solveIt2(s,obs,vis,vis);
  logGrid(vis, printMap)
  //logGrid(vis2,'.|-|-+')
  return sol;
}

export const init = (data) =>
  data.split('\n').map(x=>x.split(''));