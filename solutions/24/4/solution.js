import {rng, sumGrid, mapGrid, getEdges, getNext} from '#helper';
import {gridWise} from '#parser';

const word = 'XMAS';

export const part1 = (input) => 
  sumGrid(mapGrid(input, count1));

export const part2 = (input) => 
  sumGrid(mapGrid(input, count2));

export const init = (data) => 
  gridWise(x=>word.indexOf(x))(data);

const count = (n, fn) =>
  (c,i,j,input) =>
    input[i][j]-n?0:fn(c,i,j,input);

const count1 = 
  count(0, (c,i,j,input) =>
    rng(0,8).filter(k=>
      check1(c,i,j,k,input)).length);

const count2 = 
  count(2, (c,i,j,input) =>
    check2(c,i,j,input)|0);

const check1 = (c,i,j,dir,input) =>
  (c === word.length-1)
    || (([x,y]) => input[x]?.[y]
      && input[x][y] === c+1
      && check1(c+1,x,y,dir,input))
  (getNext([i,j],dir));

const check2 = (c,i,j,input) =>
  (i && i<input.length-1) 
    && checkEdges(getEdges(i,j,input));

const checkEdges = edges => 
  edges.every(x=>[1,3].includes(x))
  && ((edges[0] == edges[1]) 
  != (edges[0] == edges[3]))
  && edges[0] != edges[2];