import { sum, cached } from "#helper";

const times1 = 25;
const times2 = 75;

export const part1 = input=>addAllStones(input,times1);

export const part2 = input=>addAllStones(input,times2);

export const init = data=>data.split(' ').map(x=>+x);

const addAllStones = (stones, blinks)=>
  stones.reduce((a,s)=>a+ev(blinks,s),0);

const ev = cached((n,s)=>
  !n?1:sum(next(s).map(s=>ev(n-1,s))));

const next = (s,ss=''+s)=>
  ((sl=ss.length,hsl=(sl/2)|0)=>
  !+s?[1]:(sl%2?[s*2024]
      :[+ss.substring(0,hsl),
        +ss.substring(hsl)]))();