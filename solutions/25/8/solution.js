import { isTest } from '#solver';

const dist = (a,b) => {
  let sum = 0;
  for (let i=a.length;i-->0;)
    sum+=Math.pow(a[i]-b[i],2);
  return Math.sqrt(sum);
}

const getAllDist = input => {
  const ds = [];
  for (let i=input.length;i-->0;)
    for (let j=i;j-->0;)
      ds.push([dist(input[i],input[j]),i,j]);
  return ds;
}

const connectNext = (all,js) => {
  const [,i,j] = all.shift();
  let e1 = js.find(e=>e.has(i));
  let e2 = js.find(e=>e.has(j));
  if (e1!==e2) {
    const n1 = js.indexOf(e1);
    js.splice(n1,1);
    const n2 = js.indexOf(e2);
    js.splice(n2,1,e1.union(e2));
  }
  return [i,j];
}

export const part1 = ([,all,js]) => {
  for (let k=isTest()?10:1000;k-->0;) 
    connectNext(all,js);
  return js.sort((a,b)=>b.size-a.size)
    .slice(0,3).reduce((a,c)=>a*c.size,1);
}

export const part2 = ([input,all,js]) => {
  let i,j;
  while(js.length!==1)
    [i,j] = connectNext(all,js);
  return input[i][0]*input[j][0];
};

export const init = (data) =>
  (input=>[
    input,
    getAllDist(input).sort(([a],[b])=>a-b),
    input.map((_,i)=>new Set([i]))
  ])
  (data.split('\n').map(r=>
    r.split(',').map(n=>+n)));