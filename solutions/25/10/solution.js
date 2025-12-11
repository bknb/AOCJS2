import {debug} from '#display';
import {insert,countB,fmin
  ,rng,fsum} from '#helper';

const cmp = ([a,,cda],[b,,cdb])=>
  a+cda.length-(b+cdb.length);

const mpl = ([ls,w,bl])=>{
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
  return debug(min);
};

const mpj = ([,,bl,tc])=>
  debug(mp(tc.map((c,i)=>
    [c,bl.map((b,i)=>
      [b,i]).filter(([b])=>
        b.includes(i)).map(([,i])=>i)])));

const mp=cmb=>{
  if(cmb.some(([c])=>c<0))
    return Infinity;
  if(!cmb.length) return 0;
  cmb.sort(([an,a],[bn,b])=>
    (a.length-b.length)||an-bn);
  const [fc,...rc] = cmb
  const [c,bs]=fc;
  const [i,...ri] = bs;
  if(i===undefined)
    return c?Infinity:mp(rc);
  let simp = false;
  cmb = [fc,...rc.map(([cc,bts])=>
    bs.every(e=>bts.includes(e))
      ?simp=true&&[cc-c,bts.filter(e=>
        !bs.includes(e))]
      :[cc,bts])];
  if(simp) return mp(cmb);
  if(!ri.length) return c+mp(rc);
  return fmin(cc=>cc+
    mp(rdc(cmb,cc,i)))(rng(c+1));
}

const rdc = (cmb,n,i)=>
  cmb.map(([c,bts])=>
    bts.includes(i)
    ?[c-n,bts.filter(j=>i!==j)]
    :[c,bts]);

const dist = (l1,l2,w)=>
  countB(l1^l2,w);

const bl2b = bl=>
  bl.reduce((a,c)=>a^=1<<c,0);

const nl2bl = nl=>
  nl.reduce((a,c,i)=>a^=c&&1<<i,0);

export const part1 = fsum(mpl);

export const part2 = fsum(mpj);

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