import {log, cLog} from '#display';
import {allNext} from '#helper';
import {seperate} from '#parser';

const dirMap = "^>v<";
const dirs = allNext([0,0],true);

const red = cLog(255,0,0);

export const part1 = ([grid,coms]) => {
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

export const part2 = (input) => {
  // Write your code here
  return null;
};

export const init = (data) => {
  const [grid, coms] = seperate(data);
  return [grid.map(r=>r.split('')),
          coms.reduce((a,c)=>a.concat(c)).split('')
          .map(c=>dirMap.indexOf(c))];
};