import {log,logGrid} from '#display';
import {rng} from '#helper';

export const part1 = ([start,filler]) => {
  let i=0,j=0,r=0;
  while (i+j<start.length) {
    let next = start[i];
    while (next==-1) next=filler[j++];
    r+=i++*+next;
  }
  return r;
}

export const part2 = ([start,filler]) => {
  let i=0,j=0,r=0,l=0;
  while (i+j<start.length) {
    let next = start[i]; 
    while (next==-1) next=filler[j++];
    r+=i++*+next;
  }
  return r;
}

export const init = (data) =>
  (seq=>[seq,[...seq].reverse()])
  ((ns=>createSeq(ns))
  (data.split('').map(x=>+x)));

const createSeq = input=>
  input.reduce((a,c,i)=>
    a.concat(arrC(c,(i%2?-1:i/2))),[]);

const arrC = (l,c)=>rng(0,l).map(_=>c);
  