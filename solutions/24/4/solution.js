import {rng, sumGrid, mapGrid, getEdges, getNext} from '#helper';
import {linify} from '#parser';

const word = 'XMAS'

export const part1 = (input) => 
  sumGrid(mapGrid(input, count1));

export const part2 = (input) => 
  sumGrid(mapGrid(input, count2));

function count1(i,j,input) {
  if (input[i][j]) return 0;
  return rng(0,8).filter(k=>
    check1(i,j,k,input)).length;
}

function count2(i,j,input) {
  if (input[i][j]-2) return 0;
  return ~~check2(i,j,input);
}

function check1(i,j,dir,input) {
  if (input[i][j] === word.length-1) return true;
  const [x,y] = getNext([i,j],dir);
  if (!input[x]?.[y]) return false;
  return input[x][y] === input[i][j]+1
    && check1(x,y,dir,input);
}

function check2(i,j,input) {
  if (!(i && i<input.length-1)) return false;
  const edges = getEdges(i,j,input);
  return edges.every(x=>!isNaN(x)&&x%2)
    && edges[0] !== edges[3] 
    && (edges[0] === edges[1] 
        ? edges[0] !== edges[2]
        : edges[0] === edges[2]);
}

export const init = (data) => 
  linify(data)
    .map(x=>x.split('')
    .map(x=>word.indexOf(x)));