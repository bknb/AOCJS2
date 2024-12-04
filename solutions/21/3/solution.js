import {linify, numberfy} from '#parser';

const toNumber = (x) => +('0b'+x.join(''));

export const part1 = (input) => {
  const bin = input
    .reduce((c,r)=>c.map((n,i)=>n+r[i]))
    .map(x=>~~(x>input.length/2));
  const inv = bin.map(x=>x?0:1);
  return toNumber(bin)*toNumber(inv);
}

export const part2 = (input) => {
  const oxgen = toNumber(filter(input, true));
  const coscrub = toNumber(filter(input, false));
  return oxgen*coscrub;
}

function filter(input, isMost) {
  return input[0].reduce((a,c,i)=>
    a.length===1?a:a.filter(x=>
      !x[i]===optInv(getMost(a,i),isMost)),input)[0];
}

function optInv(x, inv) {
  return inv ? !x : x;
}

function getMost(ar, i) {
  return ar.reduce((a,c)=>a+c[i],0)>=ar.length/2;
}

export const init = (data) => 
  linify(data).map(x=>numberfy(x.split('')));