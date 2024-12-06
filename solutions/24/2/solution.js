import {count, allBut} from '#helper';
import {linify, chunkify, numberfy} from '#parser';

export const part1 = (input) => 
  count(input, isSafe);

export const part2 = (input) =>
  count(input.map(row =>
    enrichSubs(row).some(isSafe)));

export const init = (data) =>
  numberfy(chunkify(linify(data)));

const isSafe = (row) =>
  row.slice(1)
    .map((x,i)=>[row[i]>x,Math.abs(row[i]-x)])
    .every(([inc,delta],i,[[first]])=>
      inc===first&&delta>0&&delta<4);

const enrichSubs = (row) =>
  [row,...row.map((x,i,arr)=>allBut(arr,i))];