import {log} from '#display';

export const toBinGrid = (grid,fn)=> {
  let result = 0n;
  for (let i=grid.length;i-->0;)
    for (let j=grid[0].length;j-->0;)
      result=(result<<1n)
        |BigInt((v=>fn?fn(v):!!v)
                (grid[i][j]));
  return result;
}

export const BGtoStr = (n,w,m='.#',h=w)=> {
  let result = '';
  for (let i=h;i-->0;) {
    for (let j=w;j-->0;)
      (result+=m[n&1n])&&(n>>=1n);
    i&&(result+='\n');
  }
  return result;
} 

export const moveBG = (n,[dx,dy],w) =>
  n<<BigInt(dx*w+dy);
  