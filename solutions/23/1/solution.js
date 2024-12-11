const nums = 'one|two|three|four|five|six|seven|eight|nine';

export const part1 = (input) => 
  input.map(x=>x.match(/(?<=^[^\d]*)\d/)?.[0]
    +x.match(/\d(?=[^\d]*$)/)?.[0])
  .reduce((a,c)=>a+(+c),0);

export const part2 = (input) => 
  part1(input.map(sub));

const sub = str=>
  str.replace(rx('(?=('+nums+'))'),rep);

const rep = (_,m)=>
  nums.split('|').indexOf(m)+1

const rx = s=>new RegExp(s,'g');

export const init = (data) => 
  data.split('\n');