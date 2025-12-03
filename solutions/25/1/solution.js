const f = 100, fl = Math.floor;

export const part1 = (input) =>
  input.reduce((a,[,n]) => !(n%f)+a,0);

export const part2 = (input) =>
  input.reduce((a,[s,e],i)=>
    ((fs=fl(s/f),fe=fl(e/f),
     os=!(s%f),oe=!(e%f))=>
      (s>e?fs-fe+oe-os:fe-fs)+a)(),0);

export const init = (data, d = 50) =>
  data.split('\n')
    .map(l=>l.match(/(L|R|\d+)/g))
    .map(([dir,n])=>((isL=dir==='L')=>
      [d,d+=n*(isL?-1:1)])());