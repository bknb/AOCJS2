import {log} from '#display';
import {rng, sum} from '#helper';
import * as parser from '#parser';

const isInvalid = (n) => {
  return /^(\d+)\1$/.test(`${n}`);
}

const isInvalid2 = (n) => {
  return /^(\d+)\1+$/.test(`${n}`);
}

export const part1 = (input) => {
  let sum = 0;
  for(let i=input.length;i-->0;)
    for(let j=input[i][1]+1;j-->input[i][0];)
      if(isInvalid(j)) sum += j;
  return sum;
};

export const part2 = (input) => {
  let sum = 0;
  for(let i=input.length;i-->0;)
    for(let j=input[i][1]+1;j-->input[i][0];)
      if(isInvalid2(j)) sum += j;
  return sum;
};

export const init = (data) => 
  data.split(',').map(l=>l.split('-').map(d=>+d));