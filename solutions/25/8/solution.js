import {isTest} from '#solver';
import {dist, remove} from '#helper';

const cc = isTest()?10:1000;

const getAllDist = jbs => {
  const ds = [];
  for (let i=jbs.length;i-->0;)
    for (let j=i;j-->0;)
      ds.push([dist(jbs[i],jbs[j]),i,j]);
  return ds.sort(([a],[b])=>a-b);
};

const connectNext = (jbcs,cs) => {
  const [,...i] = jbcs.shift();
  const [e1,e2] = i.map(x=>
    cs.find(e=>e.has(x)));
  e1!==e2&&remove(cs,e1)
    &&e1.forEach(e=>e2.add(e));
  return i;
};

export const part1 = ([,jbcs,cs]) => {
  for (let k=cc;k-->0;) 
    connectNext(jbcs,cs);
  return cs.sort((a,b)=>b.size-a.size)
    .slice(0,3).reduce((a,c)=>a*c.size,1);
};

export const part2 = ([jbs,jbcs,cs]) => {
  let i,j;
  while(cs.length!==1)
    [i,j] = connectNext(jbcs,cs);
  return jbs[i][0]*jbs[j][0];
};

export const init = (data) =>
  (input=>[
    input,
    getAllDist(input),
    input.map((_,i)=>new Set([i]))
  ])(data.split('\n').map(r=>
    r.split(',').map(n=>+n)));