const times1 = 25;
const times2 = 75;

const cache = new Map();

export const part1 = input=>addAllStones(input,times1);

export const part2 = input=>addAllStones(input,times2);

export const init = data=>data.split(' ');

const addAllStones = (stones, blinks)=>
  stones.reduce((a,c)=>a+ev(blinks)(c),0);

const ev = n=>stone => {
  if(!n) return 1;
  const key = `${stone},${n}`;
  if(cache.has(key)) return cache.get(key);
  let ns = [];
  const sl = stone.length;
  if(!+stone) ns.push('1');
  else if(sl%2) ns.push(''+stone*2024);
  else ns.push(
    stone.substring(0,(sl/2)|0),
    ''+(+stone.substring((sl/2)|0)));
  const res = ns.map(ev(n-1))
    .reduce((a,c)=>a+c);
  cache.set(key,res);
  return res;
}