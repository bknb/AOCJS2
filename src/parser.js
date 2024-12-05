export const linify = (input) =>
  input.split('\n');

export const numberfy = (items) =>
  items.map(d=>isNaN(d)?d:+d);

export const chunkify = (items, regex = /[-\w]+/g) =>
  items.map((item) => item.match(regex));

export const splitify = (items, regex = '') =>
  items.map(d=>d.split(regex));

export const test = (items, regex) =>
  items.filter((item) => regex.test(item));

export const matcher = (regex, n) =>
  (item => item.match(regex).slice(1,1+n));

export const grid = (input) =>
  linify(input).map(splitify);

export const seperate = (input, seperator = /^\s*$/) =>
  linify(input).reduce(([[...a],...r],c)=>
    seperator.test(c)?[[],a,...r]:[[...a,c],...r],[[]])
  .reverse();