import {cached} from '#helper';
import {seperate} from '#parser';

export const part1 = ([tps,ds]) =>
  ds.filter(d=>cachedMatches(tps,d)).length;

const matches = (tps,d) => 
  d.length?tps.filter(tp=>
    d.startsWith(tp)).some(tp=>
    cachedMatches(tps,d.slice(tp.length)))
  :true;

const count = (tps,d) =>
  d.length?tps.filter(tp=>
    d.startsWith(tp)).reduce((a,tp)=>
    a+cachedCount(tps,d.slice(tp.length)),0)
  :1;

const cachedMatches = cached(matches);
const cachedCount = cached(count);

export const part2 = ([tps,ds]) => 
  ds.reduce((a,d)=>a+cachedCount(tps,d),0);

export const init = (data) => {
  const [tps,ds] = seperate(data);
  return [tps[0].split(', ')
          .sort((a,b)=>b.length-a.length),ds];
};