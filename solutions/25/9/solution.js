import {allPairs, area, 
        buckets, inRng} from '#helper';

const maxArea = pps =>
  pps.map(([b,c])=>area(b,c))
    .reduce((a,c)=>a>c?a:c);

const cuts = (x1,x2,x3,y1,y2,y3,y4) => {
  if (!inRng(x3,x1,x2)) {
    const fxIn = inRng(y3,y1,y2);
    const sxIn = inRng(y4,y1,y2);
    return fxIn===0||fxIn!==sxIn;
  }
}

const xx = ([x1,y1],[x2,y2])=>
  ([[x3,y3],[x4,y4]])=>
    x3===x4
      ?cuts(x1,x2,x3,y1,y2,y3,y4)
      :cuts(y1,y2,y3,x1,x2,x3,x4);

export const part1 = input => 
  maxArea(input);

export const part2 = input => {
  const [cs,xs] = buckets(input,
    ([[x1,y1],[x2,y2]])=>
      x1===x2||y1===y2);
  return maxArea(cs.filter(([a,b])=>
    !xs.some(xx(a,b))));
}

export const init = data =>
  allPairs(data.split('\n').map(r=>
    r.split(',').map(n=>+n)));