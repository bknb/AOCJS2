import {spreadBG,countBG,rng,toSingleBG,bg} from '#helper';
import {bgify} from '#parser';

export const part1 = (input) => {
  const [bgs,w,h] = bgify(input,rng(0,10));
  return toSingleBG(bgs[0],w,h).map(start=>
    bgs.slice(1).reduce((a,c)=>
      spreadBG(a,w,h)&c,start))
    .map(n=>countBG(n,w,h))
    .reduce((a,c)=>a+c);
};

export const part2 = (input) => {
  const board = bg(input);
  const bgs = board.chars.sort()
    .map(c=>board.bgs.get(c));
  const starts = board.toSingles(bgs[0]);
  return starts.map(start=>
      bgs.slice(1).reduce((a,c)=>
        board.spread(a)&c,start))
    .map(n=>board.count(n))
    .reduce((a,c)=>a+c);
};

export const init = (data) => data;