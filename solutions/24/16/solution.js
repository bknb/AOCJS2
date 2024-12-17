import {log} from '#display';
import {allNext, oob} from '#helper';
import chalk from 'chalk';

let grid;

export const part1 = ([s,e,g])=> {
  grid = g;
  const es = net(s[0],e);
  log(es);
  shrinkEs(es,s[0].join(','),e.join(','));
  log(es);
  return getShortest(s,e,es,[]);
}

const shrinkEs = (es,s,e) => {
  const rks = [], mks = new Map();
  [...es.entries()].forEach(([k,v])=>{
    if (k!=s&&k!=e) {
      if (v.size==2 && ![...v.keys()].some(x=>mks.has(x)))
        mks.set(k,[...v.entries()]);
    }
  });
  [...mks.entries()].forEach(([k,[[a,av],[b,bv]]])=>{
    es.delete(k);
    const dist = av[0]+bv[0]+1000*(Math.abs(av[1]-bv[1])%2);
    const [,ad] = es.get(a).get(k);
    es.get(a).set(b,[dist,ad]).delete(k);
    const [,bd] = es.get(b).get(k);
    es.get(b).set(a,[dist,bd]).delete(k);
  });
  [...es.entries()].forEach(([k,v])=>{
    if (k!=s&&k!=e) {
      if (v.size<2)
        rks.push([k,v.keys().next().value]);
    }
  });
  rks.forEach(([s,d])=>es.delete(s)&&es.get(d).delete(s));
  if (rks.length || mks.size) shrinkEs(es,s,e);
}

const getShortest = (s,e,es,p)=> {
  const [c,od] = s;
  const [ox,oy] = c;
  if (ox == e[0] && oy == e[1]) return 0;
  const np = [...p,c.join(',')];
  const alts = [...es.get(c.join(',')).entries()]
    .filter(([c])=>!np.includes(c))
    .map(([n,[dist,dir]])=>
      [n.split(',').map(x=>+x)
       ,dist+1000*(dir!=od)])
    .sort(([x],[y])=>heu(x,e)-heu(y,e));
  return log(alts).reduce((a,[x,d])=>{
      const inDir = es.get(x.join(',')).get(c.join(','))[1];
      let shortest = d+getShortest([x,(inDir+2)%4],e,es,np);
      return Math.min(a,shortest);
    },Infinity);
}

const net = (s,e) => {
  const es = new Map();
  const ks = new Set();
  const q = [s];
  while(q.length) {
    const src = q.shift(),
      srcS = src.join(',');
    ks.add(srcS);
    allNext(src,true)
    .map((x,d)=>[x,d])
    .filter(([[x,y]])=>
      !oob(x,y,grid)&&!grid[x][y])
    .map(x=>[getNext(x,e),x[1]])
    .filter(([[dest]])=>dest&&
      !ks.has(dest.join(',')))
    .forEach(([[dest,dist,destDir],srcDir])=>{
      const destS = dest.join(',');
      if(!es.has(destS))
        es.set(destS, new Map());
      if(!es.has(srcS))
        es.set(srcS, new Map());
      es.get(srcS).set(destS, [1+dist,srcDir]);
      es.get(destS).set(srcS, [1+dist,destDir]);
      q.push(dest);
    })
  }
  return es;
} 

const getNext = (s,e) => {
  const [[ox,oy],od] = s;
  const ns = allNext([ox,oy],true)
    .map(([x,y],d)=>[[x,y],d])
    .filter(([[x,y],d])=>
      !oob(x,y,grid)&&
      !grid[x][y]&&
      ((d+2)%4)!=od);
  if (ox != e[0] || oy != e[1]) {
    if (ns.length==0) return [];
    if (ns.length==1) {
      const [[nx,ny],nd] = ns[0];
      const [x,dist,dir] = getNext([[nx,ny],nd],e);
      return x?[x,dist+1+1000*(nd!=od),dir]:[];
    }
  }
  return [[ox,oy],0,(od+2)%4];
}

const opt = (s,e,path) => {
  const [[ox,oy],od] = s;
  if (ox == e[0] && oy == e[1]) return 0;
  const nPath = path.concat([[ox,oy]]);
  const ns = allNext([ox,oy],true)
    .map(([x,y],d)=>[[x,y],d])
    .filter(([[x,y]])=>!grid[x][y]
      &&!nPath.some(([i,j])=>(i==x&&j==y)))
    .map(([x,d])=>[x,d,heu(x,e)])
    .sort(([,ad,a],[,bd,b])=>
      ad==od?Infinity:(bd==od?-Infinity:a-b));
  if (ns.length == 0) return Infinity;
  let min = Infinity;
  for (let [x,d] of ns) {
    let score = opt([x,d],e,nPath);
    if (d!=od) score += 1000;
    if (score < min) min = score;
  }
  return min+1;
}

const heu = ([sx,sy],[ex,ey]) => {
  return Math.abs(sx-ex)
    +Math.abs(sy-ey);
}

export const part2 = (input) => {
  // Write your code here
  return null;
};

export const init = (data) => {
  let s,e;
  const grid = data.split('\n')
    .map((r,x)=>r.split('').map((c,y)=>{
      if (c == 'S') s = [[x,y],1];
      if (c == 'E') e = [x,y];
      return ~~(c == '#');
    }));
  return [s,e,grid];
};