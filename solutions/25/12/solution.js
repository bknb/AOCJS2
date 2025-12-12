import {debug, log} from '#display';
import {visGrid,rng,fsum} from '#helper';
import * as parser from '#parser';

const vg = visGrid();

const r90=s=> {
  const ns = [];
  for(let j=0;j<s[0].length;j++) {
    const row=[];
    for(let i=s.length;i-->0;)
      row.push(s[i][j]);
    ns.push(row);
  }
  return ns;
}

const n0r=(w,h)=>
  [...Array(h)].map(()=>
    [...Array(w)].map(c=>false));

const fits=ss=>([w,h,scs])=>{
  return true;
}

const pn=(r,s)=>{
  let f=false;
  for(let i=r.length;i-->3;)
    for(let j=r[i].length;j-->3;)
      for(let k=4;i-->0;)
        for(let n=3;n-->0;)
          for(let m=3;m-->0;)
            break;
}

export const part1 = 
  ([cs,ss])=>fsum(fits(ss))(cs);

export const part2 = (input) => {
  // Write your code here
  return null;
};

export const init = (data) => {
  const ps = data.split('\n\n');
  const cs = ps.pop().split('\n')
    .map(c=>c.match(/\d+/g).map(n=>+n))
    .map(([w,h,...cs])=>[w,h,cs]);
  const ss = ps.map(s=>s.split('\n')
    .slice(1).map(r=>
      r.split('').map(c=>c==='#')));
  return [cs,ss];
};