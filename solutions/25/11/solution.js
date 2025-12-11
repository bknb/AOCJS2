import {debug, log} from '#display';
import { isTest } from '#solver';

const si = isTest()?1:0;
const cache = [new Map(),new Map()];

const run=(cs,cp,n,g,c)=>{
  const h = n+','+g;
  if(c.has(h)) return c.get(h);
  if(n===g) return c.set(h,1)&&1;
  const result = cs.find(([s])=>s===n)
    ?.[1].reduce((sum,nn)=>
      cp.includes(nn)?sum:
    sum+run(cs,[n,...cp],nn,g,c),0)||0;
  return c.set(h,result)&&result;
}

export const part1 = (input) => {
  return run(input[si],[],'you','out',cache[si]);
};

export const part2 = (input) => {
  const pts = [
    ['svr','dac','fft','out'],
    ['svr','fft','dac','out']];

  return pts.reduce((s,pt)=>
    s+pt.slice(1).reduce((p,g,i)=>
      p*run(input[0],[],pt[i],g,cache[0]),1),0);
};

export const init = (data) => 
  data.split('\n\n').map(g=>
    g.split('\n').map(r=>
      r.match(/\w+/g)).map(([f,...r])=>[f,r])
  );