const times1 = 25;
const times2 = 75;

const cache = new Map();

export const part1 = input=>addAllStones(input,times1);

export const part2 = input=>addAllStones(input,times2);

export const init = data=>data.split(' ');

const addAllStones = (stones, blinks)=>
  stones.reduce((a,c)=>a+ev(c,blinks),0);

const ev = (stone,n) => {
  if(!n) return 1;
  const key = `${stone},${n}`;
  if(cache.has(key)) return cache.get(key);
  let result;
  const sl = stone.length
  if(!+stone) result=ev('1',n-1);
  else if(sl%2) result=ev(''+stone*2024,n-1);
  else result=ev(stone.substring(0,(sl/2)|0),n-1)
    + ev(''+(+stone.substring((sl/2)|0)),n-1);
  cache.set(key,result);
  return result;
}