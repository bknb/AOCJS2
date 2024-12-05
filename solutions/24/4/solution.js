import {rng, sumGrid, mapGrid, getEdges, getNext} from '#helper';
import {linify} from '#parser';

const word = 'XMAS';

const count = (n, fn) =>
  (i,j,input) =>
    input[i][j]-n?0:fn(i,j,input);

const check1 = (i,j,dir,input) =>
  (input[i][j] === word.length-1)
    || (([x,y]) => input[x]?.[y]
      && input[x][y] === input[i][j]+1
      && check1(x,y,dir,input))
  (getNext([i,j],dir));

const count1 = 
  count(0, (i,j,input) =>
    rng(0,8).filter(k=>
      check1(i,j,k,input)).length);

const check2 = (i,j,input) =>
  (i && i<input.length-1) 
    && (edges => edges.every(x=>!isNaN(x)&&x%2)
      && edges[0] !== edges[3] 
      && (edges[0] === edges[1] 
          ? edges[0] !== edges[2]
          : edges[0] === edges[2]))
    (getEdges(i,j,input));

const count2 = 
  count(2, (i,j,input) =>
    check2(i,j,input)|0);

export const part1 = (input) => 
  sumGrid(mapGrid(input, count1));

export const part2 = (input) => 
  sumGrid(mapGrid(input, count2));

export const init = (data) => 
  linify(data)
    .map(x=>x.split('')
    .map(x=>word.indexOf(x)));