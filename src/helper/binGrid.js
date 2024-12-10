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

//spread and move problems with wrapping

export const spreadBG = (n,w)=>
  n>>BigInt(w)|n<<BigInt(w)|n<<1n|n>>1n;

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
  