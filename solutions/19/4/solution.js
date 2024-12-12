import {rng,count} from '#helper';

export const part1 = ([low, high]) =>
  count(rng(low,high),n=>testAsc(n)
    &&/(\d)\1/.test(n));

export const part2 = ([low, high]) => 
  count(rng(low,high),n=>testAsc(n)
    &&rng(1,10).some(tn=>
      new RegExp(rgx(tn)).test(n)));

export const init = (data) =>
  data.split('-').map(x=>+x);

const testAsc = n=>
  ((na=(''+n).split(''))=>
    na.slice(1).every((d,i)=>d>=na[i]))();

const rgx = n=>
  `(^|[^${n}])${n}${n}([^${n}]|$)`;