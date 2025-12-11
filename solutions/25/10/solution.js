import {debug, log} from '#display';
import {insert, countB,rng} from '#helper';
import * as parser from '#parser';

const cmp = ([a,,cda],[b,,cdb])=>
  a+cda.length-(b+cdb.length);

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

const fp3 = ([,,bl,tc])=>{
  const cmb =tc.map((c,i)=>[c,bl.map((b,i)=>
    [b,i]).filter(([b])=>
      b.includes(i)).map(([,i])=>i)]);
  return mp(cmb);
}

const mp=cmb=>{
  if(cmb.some(([c])=>c<0))
    return Infinity;
  if(!cmb.length)
    return 0;
  cmb.sort(([an,a],[bn,b])=>
    (a.length-b.length)||an-bn);
  const [c,bs]=cmb[0];
  const [i,...ri] = bs;
  if(i===undefined)
    return c?Infinity:mp(cmb.slice(1));
  let simp = false;
  cmb = cmb.map(([cc,bts],i)=>{
    if(i&&bs.every(e=>bts.includes(e))) {
      simp = true;
      return [cc-c,bts.filter(e=>
        !bs.includes(e))];
    }
    return [cc,bts];
  });
  if (simp) return mp(cmb);
  if(!ri.length)
    return c+mp(cmb.slice(1));
  const max = Math.min(...cmb.filter(([,bts])=>
    bts.includes(i)).map(([n])=>n));
  return rng(max+1).reduce((a,cc)=>{
    const ncmb = rdc(cmb,cc,i);
    const ps = cc+mp(ncmb);
    return ps<a?ps:a;
  },Infinity);
}

const rdc = (cmb,n,i)=>
  cmb.map(([c,bts])=>
    bts.includes(i)
    ?[c-n,bts.filter(j=>i!==j)]
    :[c,bts]);

const dist = (l1,l2,w)=>
  countB(l1^l2,w);

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