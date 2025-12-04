import {allNext} from '#helper';

export const part1 = (input) =>
  input.reduce((t1,r,i)=>
    r.reduce((t2,c,j)=>
      t2+(c&&allNext([i,j]).reduce((t3,[x,y])=>
        t3+~~input?.[x]?.[y],0)<4),0)+t1,0);

export const part2 = (input) => {
  let c, t = 0;
  do c=input.reduce((t1,r,i)=>
    r.reduce((t2,c,j)=>
      t2+(c&&allNext([i,j]).reduce((t3,[x,y])=>
        t3+~~input?.[x]?.[y],0)<4
      &&!(input[i][j]=false)),0)+t1,0);
  while (c&&(t+=c));
  return t;
}

export const init = (data) =>
  data.split('\n').map(r=>r.split('').map(c=>c==='@'));