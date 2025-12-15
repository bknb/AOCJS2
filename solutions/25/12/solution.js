import {debug, log, condLog} from '#display';
import {visBG,toBG,eqGrid,moveBG,rotG,flpG} from '#helper';
import * as parser from '#parser';

const u = undefined;

const gcs = (ss,mw)=>{

}

const gv=s=>{
  const as = [s];
  for (let i=3;i-->0;) {
    s=rotG(s);
    if(!as.some(os=>eqGrid(os,s)))
      as.push(s);
  }
  s=flpG(s);
  if(as.some(os=>eqGrid(os,s)))
    return as;
  as.forEach(s=>as.push(flpG(s)));
  return as;
}

const fits=([w,h,scs],ss)=>{
  const rss =ss.map((sg,n) =>
    scs[n]&&[scs[n],sg.map(s=>{
      const bgs = toBG(s,u,w);
      const siap = [];
      for (let i=h-2;i-->0;)
        for(let j=w-2;j-->0;)
          siap.push(moveBG(bgs,[i,j],w));
      return siap;
    })]).filter(sg=>sg)
    .map(([n,sg])=>
      [...Array(n)].map(()=>
        sg.flat())).flat();
  return fr(0n,rss);
}

const fits2=([w,h,scs],ss)=>{
  const rss =ss.map((sg,n) =>
    [[n],sg.map(s=>{
      const bgs = toBG(s,u,w);
      const siap = [];
      for (let i=h-2;i-->0;)
        for(let j=w-2;j-->0;)
          siap.push(moveBG(bgs,[i,j],w));
      return siap;
    })]).map(([n,sg])=>
      [...Array(n)].map(()=>
        sg.flat())).flat();
}

const ap = 

const fr = (r,[fsg,...rsg]) => {
  if (!fsg) return true;
  for(let i=fsg.length;i-->0;)
    if(!(r&fsg[i]))
      if(fr(r|fsg[i],rsg))
        return true;
}

export const part1 = ([cs,ss])=>
  cs.reduce((a,c)=>a+log(!!fits(c,ss),a),0);

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
      r.split('').map(c=>c==='#')))
    .map(s=>gv(s,3));
  return [cs,ss];
};