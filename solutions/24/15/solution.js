import {log, cLog} from '#display';
import {allNext, next} from '#helper';
import {seperate} from '#parser';

const dirMap = "^>v<";
const dirs = allNext([0,0],true);

export const part1 = ([grid,coms]) => {
  grid = grid.map(r=>r.split(''));
  let robot;
  for (let y = 0; y < grid.length; y++)
    for (let x = 0; x < grid[y].length; x++)
      if (grid[y][x] == '@')
        robot = [x,y];
  for (let i = 0; i < coms.length; i++) {
    let mRob = move(robot, '@', coms[i], grid);
    if (mRob) robot = mRob;
  }
  let sum = 0;
  for (let y = 0; y < grid.length; y++)
    for (let x = 0; x < grid[y].length; x++)
      if (grid[y][x] == 'O')
        sum+=x+100*y;
  return sum;
};

export const part2 = ([grid,coms]) => {
  grid = grid.map(r=>r.replaceAll('#','##')
    .replaceAll('.','..').replaceAll('O','[]')
    .replaceAll('@','@.').split(''));
  let robot;
  for (let i = 0; i < coms.length; i++) {
    for (let y = 0; y < grid.length; y++)
      for (let x = 0; x < grid[y].length; x++)
        if (grid[y][x] == '@')
          robot = [y,x];
    move2(robot, coms[i], grid);
  }
  log(grid.map(r=>r.join('')).join('\n'))
  let sum = 0;
  for (let y = 0; y < grid.length; y++)
    for (let x = 0; x < grid[y].length; x++)
      if (grid[y][x] == '[')
        sum+=x+100*y;
  return sum;
};

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
  if (grid[nx][ny] == '.') {
    grid[nx][ny] = grid[x][y];
    grid[x][y] = '.';
    return;
  }
  if (dir%2) {
    move3([nx,ny],dir,grid);
    grid[nx][ny] = grid[x][y];
    grid[x][y] = '.';
  } else {
    if (grid[nx][ny] == ']') {
      move3([nx,ny-1],dir,grid);
      move3([nx,ny],dir,grid);
      grid[nx][ny] = grid[x][y];
      grid[x][y] = '.';
    }
    else if (grid[nx][ny] == '[')  {
      move3([nx,ny],dir,grid);
      move3([nx,ny+1],dir,grid);
      grid[nx][ny] = grid[x][y];
      grid[x][y] = '.';
    }
  }
}

const movable = ([x,y],dir,grid) => {
  const [nx,ny] = next([x,y,dir],true);
  if (grid[nx][ny] == '#') return false;
  if (dir%2 && (grid[nx][ny] == ']' || grid[nx][ny] == '[')) {
    return movable([nx,ny],dir,grid);
  } else {
    if (grid[nx][ny] == ']') 
      return movable([nx,ny],dir,grid)
        &&movable([nx,ny-1],dir,grid);
    if (grid[nx][ny] == '[')
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

export const init = (data) => {
  const [grid, coms] = seperate(data);
  return [grid,
          coms.reduce((a,c)=>a.concat(c)).split('')
          .map(c=>dirMap.indexOf(c))];
};