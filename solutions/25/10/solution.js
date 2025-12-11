import {debug, log} from '#display';
import {insert, rng} from '#helper';
import * as parser from '#parser';

const cmp = ([a,,cda],[b,,cdb])=>
  a+cda.length-(b+cdb.length);
const cmp2 = ([a],[b])=>a-b;

const fp = ([ls,w,bl])=>{
  const bs = bl.map(bl2b)
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

const fp2 = ([,,bl,tc])=>{
  bl.sort((a,b)=>b.length-a.length);
  const zc = tc.map(()=>0);
  const q = [[dist2(tc,zc),zc,0]];
  let min = Infinity;
  let n;
  let i=500;
  while((n=q.shift())) {
    //log(q.slice(0,2));
    const [td,s,d] = n;
    if(!td) {if(d<min)min=d;}
    else {
      bl.forEach(bs=>{
        let max = bs.map(i=>tc[i]-s[i])
          .reduce((a,c)=>a>c?a:c);
        //log(max,bs,tc,s);
        for (let j=max+1;j-->1;) {
          const ns = [...s];
          bs.forEach(i=>ns[i]+=j);
          const e = q.find(([,os])=>
            ns.every((c,i)=>c===os[i]));
          const ncd = d+j;
          if(e) {
            if(e[2].length>ncd)
              e[2]=ncd;
          } else {
            const nd = dist2(tc,ns);
            if(nd+ncd>min) continue;
            insert(q,[nd,ns,ncd],cmp2);
          }
        }
      });
    }
  }
  return min;
}

const fp3 = ([,,bl,tc])=>{
  const cmb =tc.map((c,i)=>[c,bl.map((b,i)=>
    [b,i]).filter(([b])=>
      b.includes(i)).map(([,i])=>i)])
    .sort(([,a],[,b])=>a.length-b.length);
  log(ap(cmb[0]),cmb[0]);
  return 0;
}

const ap = ([c,bts])=> {
  if (bts.length===1) return [c];
  if(!c) return [bts.map(()=>0)];
  return rng(c).reduce((a,i)=>a.concat(ap([c-i,bts.slice(1)])),[]);
}

const dist = (l1,l2,w)=>count(l1^l2,w);
const dist2 = (tc,cc)=>
  tc.reduce((a,c,i)=>{
    const add = c-cc[i];
    if (add<0) return Infinity;
    return a+add;
  },0);

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

export const part2 = (input) => 
  input.reduce((a,c)=>fp3(c)+a,0);

export const init = (data) => 
  data.split('\n').map(r=>r.split(' '))
    .map(es=>[es.shift(),es.pop(),es])
    .map(([ls,we,bs])=>[
      nl2bl(ls.match(/[\.#]/g)
            .map(l=>l==='#')),
      ls.length-2,
      bs.map(b=>b.match(/\d+/g)
        .map(n=>+n)),
      we.match(/\d+/g).map(n=>+n)
    ])