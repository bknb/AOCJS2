import {debug, log, condLog} from '#display';
import { isTest } from '#solver';
import * as helper from '#helper';
import * as parser from '#parser';

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

export const part1 = (input) => {
  const all = getAllDist(input).sort(([a],[b])=>a-b);
  const js = input.map((_,i)=>new Set([i]));
  let max = isTest()?10:1000;
  for (let k=0;k<max;k++) {
    const [,i,j] = all[k];
    debug(js,i,j,k);
    let e1 = js.find(e=>e.has(i));
    let e2 = js.find(e=>e.has(j));
    if (e1===e2) continue;
    const n1 = js.indexOf(e1);
    js.splice(n1,1);
    const n2 = js.indexOf(e2);
    js.splice(n2,1,e1.union(e2));
  }
  return js.sort((a,b)=>b.size-a.size).slice(0,3).reduce((a,c)=>a*c.size,1);
}

export const part2 = (input) => {
  const all = getAllDist(input).sort(([a],[b])=>a-b);
  const js = input.map((_,i)=>new Set([i]));
  let k = 0;
  while(js.length!==1) {
    const [,i,j] = all[k++];
    debug(js,i,j,k);
    let e1 = js.find(e=>e.has(i));
    let e2 = js.find(e=>e.has(j));
    if (e1===e2) continue;
    const n1 = js.indexOf(e1);
    js.splice(n1,1);
    const n2 = js.indexOf(e2);
    js.splice(n2,1,e1.union(e2));
  }
  const [,n,m] = all[k-1];
  return input[n][0]*input[m][0];
};

export const init = (data) =>
  data.split('\n').map(r=>r.split(',').map(n=>+n));