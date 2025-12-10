import {allPairs, area, 
  buckets, cmpRng} from '#helper';

const maxArea = pps =>
  pps.map(([b,c])=>area(b,c))
    .reduce((a,c)=>a>c?a:c);

const cuts = (isX,...x) => {
  const i=+!isX,j=+isX,
    [x1,x2,x3,x4]=x;
  if (!cmpRng(x3[i],x1[i],x2[i])) {
    const x2c =
      cmpRng(x3[j],x1[j],x2[j]);
    return !x2c||x2c!==
      cmpRng(x4[j],x1[j],x2[j]);
  }
}

const xx = (a,b)=>([c,d])=>
    cuts(c[0]===d[0],a,b,c,d);

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