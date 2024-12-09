import {log,logGrid} from '#display';
import {rng,count} from '#helper';

export const part1 = (seq) => {
  const filler = [...seq].reverse();
  let i=0,j=0,r=0;
  while (i+j<seq.length) {
    let next = seq[i];
    while (next==-1) next=filler[j++];
    r+=i++*+next;
  }
  return r;
}

export const part2 = (seq) => {
  const filler = seq.slice(1)
    .filter(x=>x!=-1)
    .reduce(([[an,ac],...ar],c)=>an==c
      ?[[c,ac+1],...ar]
      :[[c,1],[an,ac],...ar],
            [[seq[0],1]]);
  while(filler.length)
    fill(seq,filler.shift(),0);
  return checkSum(seq);
}

const findN = (seq,n,max)=> {
  let j=0;
  for(;j<max;j++)
    if((seq[j]==-1&&nSame(seq,n,j)))
      break;
  return j;
}

const nSame = (seq,n,i)=>
  n<=1||seq.slice(i+1,i+n).every(x=>x==seq[i]);

const fill = (seq,[n,c]) => {
  const gi = seq.findIndex(x=>x==n);
  const nextGap = findN(seq,c,gi);
  if (nextGap<gi) {
    for(let j=nextGap;j<nextGap+c;j++)
      seq[j]=n;
    for(let j=gi;j<gi+c;j++)
      seq[j]=-1;
  }
}

const checkSum = (seq) =>
  seq.reduce((a,c,i)=>a+(c!=-1?c*i:0));

export const init = (data) =>
  (ns=>createSeq(ns))
  (data.split('').map(x=>+x));

const createSeq = input=>
  input.reduce((a,c,i)=>
    a.concat(arrC(c,(i%2?-1:i/2))),[]);

const arrC = (l,c)=>rng(0,l).map(_=>c);
  