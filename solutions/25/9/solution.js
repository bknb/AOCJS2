import {allPairs, area, inRng} from '#helper';

const maxArea = pps =>
  Math.max(...pps.map(([b,c])=>area(b,c)));

const cuts = (x1,x2,x3,y1,y2,y3,y4) => {
  if (!inRng(x3,x1,x2)) {
    const fxIn = inRng(y3,y1,y2);
    const sxIn = inRng(y4,y1,y2);
    return fxIn===0||fxIn!==sxIn;
  }
}

const xx = ([x1,y1],[x2,y2],[x3,y3],[,y4]) =>
  cuts(x1,x2,x3,y1,y2,y3,y4);

const xy = ([x1,y1],[x2,y2],[x3,y3],[x4]) =>
  cuts(y1,y2,y3,x1,x2,x3,x4);

export const part1 = input => 
  maxArea(input);

export const part2 = input => {
  const xs=[],ys=[],cs=[];
  input.forEach(e=> {
    const [[x1],[x2]]=e;
    if (x1===x2) return xs.push(e);
    const [[,y1],[,y2]]=e;
    if (y1===y2) return ys.push(e);
    cs.push(e);
  });
  return maxArea(cs.filter(([a,b])=>
    !xs.some(([c,d])=>xx(a,b,c,d))
    && !ys.some(([c,d])=>xy(a,b,c,d))));
}

export const init = data =>
  allPairs(data.split('\n').map(r=>
    r.split(',').map(n=>+n)));