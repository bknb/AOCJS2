import {logGrid, log} from '#display';
import {sumGrid} from '#helper';

const dirMap = '^>v<';
const dirD = [[-1,0],[0,1],[1,0],[0,-1]];

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
    ((nx<0||ny<0||nx>=obs.length||ny>=obs[0].length)
    ?vis
    :(obs[nx][ny]
      ?solve(turnR(s),obs,vis)
      :solve([nx,ny,s[2]],obs,visit(vis,nx,ny)))))
    (next(s))

const solveIt = (s, obs, vis) => {
  while(true) {
    let [nx,ny] = next(s);
    if (nx<0||ny<0||nx>=obs.length||ny>=obs[0].length)
      return vis;
    if (obs[nx][ny])
      s=turnR(s);
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

  const sol = solveIt(s,obs,vis);

  return sumGrid(sol.map(r=>r.map(c=>c?1:0)));
}

export const part2 = (input) =>
  // Write your code here
  'Solution2';

export const init = (data) =>
  data.split('\n').map(x=>x.split(''));