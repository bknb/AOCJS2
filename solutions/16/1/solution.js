import {log} from '#display';
import * as helper from '#helper';
import {matcher} from '#parser';

export const part1 = (input) =>
  input.reduce(([s,f],[t,d]) =>{
    f = (t==='R'?++f:--f)&3;
    s[f&1] += (f >> 1 ? -1 : 1)*+d;
    return [s,f];
  },[[0,0],0])[0]
  .reduce((a,x)=>a+Math.abs(x),0);

export const part2 = (input,s=[0,0],f=0) =>
  input.slice().reduce((p,[t,d],i,arr) =>{
    f = (t==='R'?++f:--f)&3;
    s[f&1] += (f >> 1 ? -1 : 1)*+d;
    log(s);
    if (p.find(([x,y])=>
      x===s[0]&&y===s[1]))
      return arr.splice(1)&&s;
    p.push([...s]);
    return p;
  },[]).reduce((a,x)=>a+Math.abs(x),0);

export const init = (data) =>
  data.split(', ').map(matcher(/([LR])(\d+)/,2));