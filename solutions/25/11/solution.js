import {debug, log} from '#display';
import { isTest } from '#solver';
import {cached} from '#helper';
import * as parser from '#parser';

const si = isTest()?1:0;
const cache = [new Map(),new Map()];

const run=(cs,cp,n,g,c)=>{
  const h = n+','+g;
  if(c.has(h)) return c.get(h);
  if (n===g) {
    c.set(h,1);
    return 1;
  }
  const ns = cs.find(([s])=>s===n);
  if(!ns) return 0;
  const result = ns[1].reduce((sum,nn)=>
    cp.includes(nn)?sum:
      sum+run(cs,[n,...cp],nn,g,c),0);
  c.set(h,result);
  return result;
}

export const part1 = (input) => {
  return run(input[si],[],'you','out',cache[si]);
};

export const part2 = (data) => {
  const [input] = data;
  const [c] = cache;
  const s1 = run(input,[],'svr','dac',c)*
    run(input,[],'dac','fft',c)*
    run(input,[],'fft','out',c);
  
  const s2 = run(input,[],'svr','fft',c)*
    run(input,[],'fft','dac',c)*
    run(input,[],'dac','out',c);

  return s1+s2;
};

export const init = (data) => 
  data.split('\n\n').map(g=>
    g.split('\n').map(r=>r.match(/\w+/g)).map(([f,...r])=>[f,r])
  );