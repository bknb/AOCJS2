import {rng} from './array';

export const getEdges = (i,j,input) =>
  [0,1].map(x=>[0,1].map(y=>
    input[i+(x?1:-1)][j+(y?1:-1)])).flat();

export const mapGrid = (input, func) =>
  input.map((x,i)=>
    x.map((y,j)=>
      func(i,j,input)));

export const sumGrid = (grid) =>
  grid.reduce((a,c)=>
    (a+c.reduce((a,c)=>
      (a+c),0)),0);

export const getNext = (c,dir) => {
  switch(dir) {
    case 0: c[0]--; case 1: c[1]++; break;
    case 2: c[1]++; case 3: c[0]++; break;
    case 4: c[0]++; case 5: c[1]--; break;
    case 6: c[1]--; case 7: c[0]--; break;
  }
  return c;
};

export const allNext = (c) =>
  rng(0,8).map(x=>getNext(c,x));