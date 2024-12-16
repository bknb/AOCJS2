import {log, cLog} from '#display';
import {allNext, next} from '#helper';
import {seperate} from '#parser';

const dirMap = "^>v<";
const dirs = allNext([0,0],true);

export const part1 = ([grid,coms]) => {
  grid = grid.map(x=>[...x]);
  let robot;
  for (let y = 0; y < grid.length; y++)
    for (let x = 0; x < grid[y].length; x++)
      if (grid[y][x] == '@')
        robot = [x,y];
  for (let i = 0; i < coms.length; i++) {
    let mRob = move(robot, '@', coms[i], grid);
    if (mRob) robot = mRob;
  }
  return sumOfCoords(grid,'O');
};

export const part2 = ([grid,coms]) => {
  grid = grid.map(r=>r.reduce((a,c)=>
    /[\.#]/.test(c)
    ?a.concat([c,c],[])
    :(c=='O'?a.concat(['[',']'])
      :a.concat([c,'.'])),[]));
  let robot;
  for (let i = 0; i < coms.length; i++) {
    for (let y = 0; y < grid.length; y++)
      for (let x = 0; x < grid[y].length; x++)
        if (grid[y][x] == '@')
          robot = [y,x];
    move2(robot, coms[i], grid);
  }
  return sumOfCoords(grid,'[');
};

const sumOfCoords = (grid, bc) =>
  grid.reduce((a,c,i)=>a+c
    .reduce((a,c,j)=>c==bc?a+i*100+j:a,0),0);

const move = (tile, c, dir, grid) => {
  let nRob = tile.map((x,i)=>(x+dirs[dir][i]));
  if (grid[nRob[0]][nRob[1]] == '#')
    return false;
  if (grid[nRob[0]][nRob[1]] == 'O')
    if(!move(nRob,'O',dir,grid))
      return false;
  grid[tile[0]][tile[1]] = '.';
  grid[nRob[0]][nRob[1]] = c;
  return nRob;
}

const move2 = ([x,y], dir, grid) => {
  if (movable([x,y],dir,grid))
    move3([x,y],dir,grid)
}

const move3 = ([x,y], dir, grid) => {
  const [nx,ny] = next([x,y,dir],true);
  const c = grid[x][y];
  const nc = grid[nx][ny];
  if (nc != '.') {
    move3([nx,ny],dir,grid);
    if (!(dir%2)){
      if (nc == ']') {
        move3([nx,ny-1],dir,grid);
      }
      if (nc == '[')  {
        move3([nx,ny+1],dir,grid);
      }
    }
  }
  grid[nx][ny] = c;
  grid[x][y] = '.';
}

const movable = ([x,y],dir,grid) => {
  const [nx,ny] = next([x,y,dir],true);
  const nc = grid[nx][ny];
  if (nc == '#') return false;
  if (dir%2 && (nc == ']' || nc == '[')) {
    return movable([nx,ny],dir,grid);
  } else {
    if (nc == ']')
      return movable([nx,ny],dir,grid)
        &&movable([nx,ny-1],dir,grid);
    if (nc == '[')
      return movable([nx,ny],dir,grid)
        &&movable([nx,ny+1],dir,grid);
  }
  return true;
}

const getParts = ([x,y],dir,grid) => {
  const [nx,ny] = next([x,y,dir],true);
  if (grid[nx][ny] == '.') return [[x,y]];
  if (dir%2)
    return getParts([nx,ny],dir,grid).concat([[x,y]]);
  else {
    if (grid[nx][ny] == ']') 
      return getParts([nx,ny],dir,grid)
        .concat(getParts([nx,ny-1],dir,grid))
        .concat([[x,y]]);
    if (grid[nx][ny] == '[') 
      return [[x,y]].concat(getParts([nx,ny],dir,grid))
        .concat(getParts([nx,ny+1],dir,grid))
        .concat([[x,y]]);
  }
}

export const init = (data) =>
  (([grid,coms]=seperate(data))=>
   [grid.map(r=>r.split(''))
   ,coms.reduce((a,c)=>a+c)
   .split('').map(c=>dirMap.indexOf(c))])();