import {log} from '#display';
import {cached, getG, rng} from '#helper';

const np=`
789
456
123
.0A`
 .split('\n').slice(1);

const dp=`
.^A
<v>`
.split('\n').slice(1);

const ps = [np].concat(rng(2).map(_=>dp));

const ps2 = [np].concat(rng(25).map(_=>dp))

const dirs = {'^':[-1,0],'>':[0,1],'v':[1,0],'<':[0,-1],'A':[0,0]};

export const part1 = (codes) =>
  log(codes.map(x=>[cShortest(x,ps),+x.substring(0,3)]))
    .map(x=>x.reduce((a,c)=>a*c))
    .reduce((a,c)=>a+c);

const shortest=(c,ps)=>{
  if (!ps.length) return c.length;
  const [cp,...rp] = ps;
  let s = getPosOf('A',cp);
  let n;
  return c.split('').map(x=>{
    n = getPosOf(x,cp);
    const dx = n.map((_,i)=>n[i]-s[i]);
    const adx = dx.map(x=>Math.abs(x));
    let parts = ['^v','<>'].map((x,i)=>
      x[~~(dx[i]>0)].repeat(adx[i]));
    let seqs = allComb(...parts).map(x=>x+'A');
    seqs = seqs.filter(x=>!isGapped(x,s,cp));
    s = n;
    return seqs.map(x=>cShortest(x,rp))
      .reduce((a,c)=>Math.min(a,c),Infinity);
  }).reduce((a,c)=>a+c,0);
}

const cShortest = cached(shortest);

const isGapped = (x,n,p)=>{
  //log(x[0],n,dirs[x[0]]);
  if (!x) return false;
  if (getG(n,p)=='.') return true;
  n = n.map((_,i)=>n[i]+dirs[x[0]][i]);
  return isGapped(x.slice(1),n,p);
}

const allComb = (str,str2)=> {
  if (!str) return [str2];
  if (!str2) return [str];
  return allComb(str.slice(1),str2).map(x=>str[0]+x)
    .concat(allComb(str,str2.slice(1)).map(x=>str2[0]+x));
}

const getPosOf = (x,g)=> {
  for (let i=g.length;i-->0;)
    for (let j=g[0].length;j-->0;)
      if (g[i][j]==x)
        return [i,j];
}

export const part2 = (codes) =>
  log(codes.map(x=>[cShortest(x,ps2),+x.substring(0,3)]))
    .map(x=>x.reduce((a,c)=>a*c))
    .reduce((a,c)=>a+c);

export const init = data => 
  data.split('\n');