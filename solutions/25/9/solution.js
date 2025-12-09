import {debug, log, condLog} from '#display';
import {allPairs} from '#helper';

const dist = ([x1,y1],[x2,y2]) =>
  (Math.abs(x1-x2)+1)*(Math.abs(y1-y2)+1);

const maxArea = jbs =>
  Math.max(...jbs.map(([b,c])=>dist(b,c)));

const inRng = (x,x1,x2) => {
  if(x>x1) return x>=x2?1:0;
  if(x<x1) return x<=x2?-1:0;
  return x1>x2?1:-1;
}

const xx = ([x1,y1],[x2,y2],[x3,y3],[,y4]) => {
  if (!inRng(x3,x1,x2)) {
    const fxIn = inRng(y3,y1,y2);
    const sxIn = inRng(y4,y1,y2);
    return fxIn===0||fxIn!==sxIn;
  }
};

const xy = ([x1,y1],[x2,y2],[x3,y3],[x4]) => {
  if (!inRng(y3,y1,y2)) {
    const fxIn = inRng(x3,x1,x2);
    const sxIn = inRng(x4,x1,x2);
    return fxIn===0||fxIn!==sxIn;
  }
};

export const part1 = (input) => 
  maxArea(allPairs(input));

export const part2 = (input) => {
  const ac = allPairs(input);
  const xs=[],ys=[],cs=[];
  ac.forEach(e=> {
    const [[x1],[x2]]=e;
    if (x1===x2) return xs.push(e);
    const [[,y1],[,y2]]=e;
    if (y1===y2) return ys.push(e);
    cs.push(e);
  });
  const av = cs.filter(([a,b])=>
    !xs.some(([c,d])=>xx(a,b,c,d))
    && !ys.some(([c,d])=>xy(a,b,c,d)));
  return maxArea(av);
}

export const init = (data) =>
  data.split('\n').map(r=>r.split(',').map(n=>+n));