import {log} from '#display';
import {rng} from '#helper';
import {seperate} from '#parser';

export const part1 = ([ls,ks]) =>
  ls.reduce((a,l)=>
    a+ks.reduce((b,k)=>
      b+~~k.every((_,i)=>k[i]+l[i]<6),0),0)

export const part2 = (input) => {
  // Write your code here
  return null;
};

export const init = (data, lks=seperate(data)) => 
  [lks.filter(x=>/^#+$/.test(x[0])),
    lks.filter(x=>!/^#+$/.test(x[0]))].map(y=>
      y.map(x=>x.map((_,i)=>
        rng(1,6).reduce((a,c)=>
          a+~~(x[c][i]=='#'),0))));