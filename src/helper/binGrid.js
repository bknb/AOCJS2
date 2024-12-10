export const colBG = (w,h)=> {
  let result = 1n;
  let bw = BigInt(w);
  for (let i=h; i-->0;)
    result|=result<<bw;
  return result;
}

export const toBG = (grid,c)=> {
  let result = 0n;
  for (let i=grid.length;i-->0;)
    for (let j=grid[0].length;j-->0;)
      result=(result<<1n)
        |BigInt((v=>c?v==c:!!v)
                (grid[i][j]));
  return result;
}

export const visBG = (n,w,h=w,m='.#',c)=> {
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

//spread and move problems with wrapping

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

export const bg = (grid) => {
  const obj=toBG(grid);
  const w=grid.length;
  const h=grid[0].length;

  const all=allBG(w,h);
  const c=colBG(w,h);

  const spread=spreadBG(all,w,h);
}
  