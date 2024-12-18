import {uniqChars,rng} from '#helper';
import {linify} from '#parser';

export const colBG = (w,h=w)=> {
  let result = 1n;
  let bw = BigInt(w);
  for (let i=h; i-->0;)
    result|=result<<bw;
  return result;
}

export const rowBG = (w)=>
  BigInt(2**w)-1n;

export const toBG = (grid,c)=> {
  let result = 0n;
  for (let i=grid.length;i-->0;)
    for (let j=grid[0].length;j-->0;)
      result=(result<<1n)
        |BigInt((v=>c?v==c:!!v)
                (grid[i][j]));
  return result;
}

export const visBG = (n,w,h=w,m='.#')=> {
  let result = '';
  for (let i=h;i-->0;) {
    for (let j=w;j-->0;)
      (result+=m[n&1n])&&(n>>=1n);
    i&&(result+='\n');
  }
  return result;
}

export const allBG = (w,h=w) => {
  let result = 1n;
  for (let i=h;i-->0;)
    for (let j=w;j-->0;)
      result|=result<<1n;
  return result;
}

export const toSingleBG = (n,w,h=w)=> {
  let result = [];
  const length = w*h;
  for (let i=length;i-->0;) {
    if(n&1n) result.push(1n<<BigInt(length-1-i))
    n>>=1n;
  }
  return result;
}

export const spreadBG = (n,w,h)=>
  ((a,c)=>spreadUpDown(n,w,a)
    |sprtedLeftRight(n,w,c,a))
  (allBG(w,h),colBG(w,h));

const spreadUpDown = (n,w,a)=>
  (n>>BigInt(w)|n<<BigInt(w))&a;

const sprtedLeftRight = (n,w,c,a)=>
  ((l,r)=>(n&l)>>1n|(n&r)<<1n)
  (a^c,a^(c<<BigInt(w-1)))

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

export const bg = (input) => {
  const chars = uniqChars(input)
    .filter(c=>c!='\n');
  const lines = linify(input);
  const w = lines.length;
  const h = lines[0].length;
  const l = w*h;
  const [bw,bh,bl]=[w,h,l].map(BigInt);

  const bgs = chars.reduce((a,c)=>
    a.set(c,toBG(lines,c)),new Map());
  
  const all=allBG(w,h);
  const col=colBG(w,h);
  const row=rowBG(w);
  const wR=all^col;
  const wL=all^(col<<BigInt(w-1));
  const wU=all^row;

  const spread=n=>
    spreadUD(n)|spreadLR(n);

  const spreadUD = (n)=>
    (n&wU)>>BigInt(w)|n<<BigInt(w);

  const spreadLR = (n)=>
    (n&wL)<<1n|(n&wR)>>1n;

  const visL = n=>
    visBG(n,w,h);

  const toSingles = n=>
    toSingleBG(n,w,h);

  const count = n=>
    countBG(n,w,h);

  return {chars,bgs,visL,spread,toSingles,count};
}
  