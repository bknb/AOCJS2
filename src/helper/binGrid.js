import {log} from '#display';

export const toBG = (grid,c)=> {
  let result = 0n;
  for (let i=grid.length;i-->0;)
    for (let j=grid[0].length;j-->0;)
      result=(result<<1n)
        |BigInt((v=>c?v==c:!!v)
                (grid[i][j]));
  return result;
}

export const BGtoStr = (n,w,h=w,m='.#')=> {
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

export const countBG = (n,w,h=w) => {
  let result = 0;
  for (let i=w*h;i-->0;) {
    result+=Number(n&1n);
    n>>=1n;
  }
  return result;
}
  