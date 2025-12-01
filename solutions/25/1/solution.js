const a = 100;
const s = 50;

const nd = (isL,d,n) => 
  mod(isL ? d-n : d+n, a);
const ro = (isL,d,n,na=n%a) => 
  isL ? na > a-d : na > d;
const mod = (n,m) => ((n%m)+m)%m;

export const part1 = (input, d = s) => 
  input.reduce((c,[isL,n]) =>
    ~~!(d = nd(isL,d,n)) + c, 0);

export const part2 = (input, d = s) => 
  input.reduce((c,[isL,n]) =>
    (~~!(d = nd(isL,d,n)) || ro(isL,d,n))
    + ~~(n/a) + c, 0);

export const init = (data) => 
  data.split('\n')
    .map(l=>l.match(/(L|R|\d+)/g))
    .map(([d,n])=>[d==='L',+n]);