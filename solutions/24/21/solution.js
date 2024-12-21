import {log} from '#display';
import {cached} from '#helper';

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

const ps = [np,dp,dp];

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
    const parts = ['^v','<>'].map((x,i)=>
      x[~~(dx[i]>0)].repeat(adx[i]));
    const gapped = cp[s[0]][n[1]]=='.';
    s = n;
    const seqs = [[...parts],parts.reverse()]
      .map(x=>x.reduce((a,c)=>a+c)+'A');
    if (parts.filter(x=>x).length===1 || gapped)
      return cShortest(seqs[0],rp);
    return seqs.map(x=>cShortest(x,rp))
      .reduce((a,c)=>Math.min(a,c),Infinity);
  }).reduce((a,c)=>a+c,0);
}

const cShortest = cached(shortest);

const getPosOf = (x,g)=> {
  for (let i=g.length;i-->0;)
    for (let j=g[0].length;j-->0;)
      if (g[i][j]==x)
        return [i,j];
}

export const part2 = (input) => {
  // Write your code here
  return null;
};

export const init = data => 
  data.split('\n');