import {seperate} from '#parser';

export const part1 = ([reg,pro]) => {
  const out = [];
  reg = [...reg];
  for (let i = 0n; i < pro.length; i+=2n)
    i=calcStep(reg,pro,i,out);
  return out.join(',');
};

const calcStep= (reg,pro,i,out) => {
  const code = pro[i];
  const val = pro[i+1n];
  switch(code) {
    case 0n: reg[0]>>=getVal(val,reg); break;
    case 1n: reg[1]^=val; break;
    case 2n: reg[1]=getVal(val,reg)%8n; break;
    case 3n: reg[0]&&(i=val-2n); break;
    case 4n: reg[1]^=reg[2]; break;
    case 5n: out.push(getVal(val,reg)%8n); break;
    case 6n: reg[1]=reg[0]>>getVal(val,reg); break;
    case 7n: reg[2]=reg[0]>>getVal(val,reg); break;
    default:
  }
  return i;
}

const getVal = (val, reg) => {
  switch (val) {
    case 0n:case 1n:case 2n:case 3n: return val;
    case 4n:case 5n:case 6n: return reg[val-4n];
    default:
  }
}
  
export const part2 = ([reg,pro]) => {
  const chunks = pro.map(_=>0);
  for (let i = 0; i < pro.length; i++) {
    for (let j=8; j-->0;) {
      const regC = reg.slice();
      regC[0]=chunks.reduce((a,c)=>a=(a<<3n)^BigInt(c),0n);
      const out = part1([regC,pro]).split(',').map(BigInt);
      if (out[pro.length-1-i]==pro[pro.length-1-i])
        break;
      chunks[i]++;
    }
  }
  return chunks.reduce((a,c)=>a=(a<<3n)^BigInt(c),0n);
};

export const init = (data) => {
  const [reg,pro] = seperate(data);
  return [reg.map(x=>BigInt(x.match(/(\d+)/)[0])),
          pro[0].split(' ')[1].split(',').map(x=>BigInt(x))];
};