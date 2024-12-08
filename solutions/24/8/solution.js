import {log,logGrid} from '#display';
import {zeroGrid,oob,sumGrid} from '#helper';
import {gridWise} from '#parser';

const antMap = 
  '.0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKJMNOPQRSTUVWXYZ';

export const part1 = (input) => {
  const anti = zeroGrid(input);
  logGrid(anti);
  for (let i=input.length;i-->0;)
    for (let j=input[i].length;j-->0;)
      for (let x=input.length;x-->0;)
        for(let y=input[x].length;y-->0;)
          if(i!=x||j!=y)
            if(input[i][j]&&input[i][j]===input[x][y]) {
              const [a,b] = [i-x,j-y];
              const [ni,nj] = [i+a,j+b];
              const [nx,ny] = [x-a,y-b];
              if(!oob(ni,nj,input))
                anti[ni][nj]=1;
              if(!oob(nx,ny,input))
                anti[nx][ny]=1;
            }
  logGrid(anti);
  return sumGrid(anti);
}

export const part2 = (input) => null
  // Write your code here

export const init = (data) => 
  logGrid(gridWise(x=>antMap.indexOf(x))(data),antMap);