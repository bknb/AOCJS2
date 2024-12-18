import {log} from '#display';
import {rowBG,colBG} from '#helper';
import {isTest} from '#solver';

let range, bytes;
let left,right,up,all,s,e;

export const part1 = (input) => {
  const map = rmBs(all,0,bytes,input);
  let flood = s;
  let i = 0;
  let lastFlood;
  while (!(flood&e)&&++i) {
    const mL = (flood&left)>>1n;
    const mR = (flood&right)<<1n;
    const mU = (flood&up)>>BigInt(range);
    const mD = flood<<BigInt(range);
    flood|=(mL|mR|mU|mD)&map;
    if (flood===lastFlood) return Infinity;
    lastFlood = flood;
  }
  return i;
};

const rmBs = (n,a,b,bs)=>{
  for (let i=a; i<b; i++)
    n^=getB(bs[i]);
  return n;
}
const getB = ([x,y])=>1n<<BigInt(y*range+x)

export const part2 = (input) => {
  while (++bytes&&part1(input)!==Infinity);
  return input[bytes-1].join(',');
};

export const init = (data) => {
  range=isTest()?7:71;
  bytes=isTest()?12:1024;
  all = 2n**BigInt(range**2)-1n;
  left = all^colBG(range);
  up = all^rowBG(range);
  right = all^(colBG(range)<<BigInt(range-1));
  s = getB([0,0]);
  e = getB([range-1,range-1]);
  return data.split('\n').map(r=>
    r.split(',').map(x=>+x));
}