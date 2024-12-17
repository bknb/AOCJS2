import {log} from '#display';
import {seperate} from '#parser';

export const part1 = ([reg,pro]) => {
  const out = [];
  for (let i = 0; i < pro.length; i+=2) {
    const code = pro[i];
    const val = pro[i+1];
    //log(i,code,val);
    switch(code) {
      case 0: reg[0]>>=getVal(val,reg); break;
      case 1: reg[1]^=val; break;
      case 2: reg[1]=getVal(val,reg)%8; break;
      case 3: reg[0]&&(i=val-2); break;
      case 4: reg[1]^=reg[2]; break;
      case 5: out.push(getVal(val,reg)%8); break;
      case 6: reg[1]=reg[0]>>getVal(val,reg); break;
      case 7: reg[2]=reg[0]>>getVal(val,reg); break;
      default:
    }
  }
  log(reg);
  return out.join(',');
};

const getVal = (val, reg) => {
  switch (val) {
    case 0:case 1:case 2:case 3: return val;
    case 4:case 5:case 6: return reg[val-4];
    default:
  }
}

export const part2 = ([reg,pro]) => {
  // Write your code here
  return null;
};

export const init = (data) => {
  const [reg,pro] = seperate(data);
  return [reg.map(x=>+x.match(/(\d+)/)[0]),
          pro[0].split(' ')[1].split(',').map(x=>+x)];
};