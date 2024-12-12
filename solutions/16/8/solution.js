import {logGrid} from '#display';
import {rng, sumGrid, mapGrid} from '#helper';
import {lineWise, matcher} from '#parser';

const board = rng(0,6).map(_=>rng(0,50).map(_=>0));

export const part1 = (input) => 
  sumGrid(logGrid(input.reduce((a,[co,i,n])=>
    co=='ct'?create(a,+i,+n)
    :(co=='ow'?rr(a,+i,+n)
      :rc(a,+i,+n)),board)));

export const init = (data) => 
  lineWise(matcher(/(ct|o[wl]).*[ =](\d+).*[ x](\d+)/,3))(data);

const create = (a,i,n) =>
  rng(0,i).forEach(y=>
    rng(0,n).forEach(x=>
      a[x][y] = 1))||a;

const rr = (a,i,n) =>
  mapGrid(a,(c,x,y,grid)=>((l=grid[0].length)=>
    x!=i?c:grid[x][(((y-n)%l)+l)%l])());

const rc = (a,i,n) =>
  mapGrid(a,(c,x,y,grid)=>((l=grid.length)=>
    y!=i?c:grid[(((x-n)%l)+l)%l][y])());