export const hspog = (input) => {
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