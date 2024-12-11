import { sum } from "#helper";

const times1 = 25;
const times2 = 75;
const cache = new Map();

export const part1 = input=>addAllStones(input,times1);

export const part2 = input=>addAllStones(input,times2);

export const init = data=>data.split(' ').map(x=>+x);

const addAllStones = (stones, blinks)=>
  stones.reduce((a,c)=>a+ev(blinks)(c),0);

const ev = n=>s=>
  ((key=`${s},${n}`)=>!n?1
    :(cache.has(key)
      ?cache.get(key)
      :setCache(key)
      (sum(next(s).map(ev(n-1))))
     ))();

const setCache=k=>v=>
  cache.set(k,v)&&v;

const next = (s,ss=''+s)=>
  ((sl=ss.length,hsl=(sl/2)|0)=>
  !+s?[1]:(sl%2?[s*2024]
      :[+ss.substring(0,hsl),
        +ss.substring(hsl)]))();