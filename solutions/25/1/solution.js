import {mod} from '#helper';
import {linify, toNum} from '#parser';

const a = 100;
const s = 50;

const nd = (isL,d,n) => mod(isL?d-n:d+n,a);
const ro = (isL,d,n) => isL?(n%a)>a-d:(n%a)>d;

export const part1 = (input, d = s) => 
  input.reduce((c,[isL,n]) =>
    c + ~~!(d=nd(isL,d,n)), 0);

export const part2 = (input, d = s) => 
  input.reduce((c,[isL,n]) =>
    c + ~~(n/a) + (~~!(d=nd(isL,d,n)) || ro(isL,d,n)), 0);

export const init = (data) => 
  linify(data)
    .map(l=>l.match(/(L|R|\d+)/g))
    .map(([d,n])=>[d==='L',toNum(n)]);