import {log,logGrid} from '#display';
import {rng} from '#helper';
import {gridWise} from '#parser';

export const part1 = (input) => {
  const start = createSeq(input);
  const filler = [...start].reverse();
  let i=0,j=0,r=0;
  while (i+j<start.length) {
    let next = start[i];
    while (next=='.') next=filler[j++];
    r+=i++*+next;
  }
  return r;
}

export const part2 = (input) => null

export const init = (data) =>
  data.split('').map(x=>+x);

const createSeq = input=>
  input.reduce((a,c,i)=>
    a.concat(arrC(c,(i%2?'.':''+i/2))),[]);

const arrC = (l,c)=>rng(0,l).map(_=>c);
  