import {debug, log} from '#display';
import {insert} from '#helper';
import * as parser from '#parser';

const cmp = ([a,,cda],[b,,cdb])=>
  a+cda.length-(b+cdb.length);

const fp = ([ls,w,bs])=>{
  const q = [[dist(ls,0,w),0,[]]];
  let min = Infinity;
  let n;
  while(n=q.shift()) {
    const [d,s,cd] = n;
    const m = cd.length;
    if(!d) {if(m<min)min=m;}
    else {
      bs.forEach((b,i) => {
        if (cd.includes(i)) return;
        const ns = b^s;
        const e = q.find(([,os])=>ns===os);
        const ncd = [i, ...cd];
        if(e) {
          if(e[2].length>m+1)
            e[2]=ncd;
        } else
          insert(q,[dist(ls,ns,w),ns,ncd],cmp);
      });
    }
  }
  return min;
}

const dist = (l1,l2,w)=>count(l1^l2,w);

const n2b = (w,n)=>n.toString(2).padStart(w, '0');

const count = (n,w) => {
  let result = 0;
  for (let i=w;i-->0;n>>=1)
    result+=n&1;
  return result;
}

export const bl2b = bl=>
  bl.reduce((a,c)=>a^=1<<c,0);

export const nl2bl = nl=>
  nl.reduce((a,c,i)=>a^=c&&1<<i,0);

export const part1 = (input) =>
  input.reduce((a,c)=>fp(c)+a,0);

export const part2 = (input) => {
  // Write your code here
  return null;
};

export const init = (data) => 
  data.split('\n').map(r=>r.split(' '))
    .map(es=>[es.shift(),es.pop(),es])
    .map(([ls,we,bs])=>[
      nl2bl(ls.match(/[\.#]/g)
            .map(l=>l==='#')),
      ls.length-2,
      bs.map(b=>b.match(/\d+/g)
        .map(n=>+n)).map(bl2b),
      we.match(/\d+/g).map(n=>+n)
    ])