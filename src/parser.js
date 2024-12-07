export const linify = (input) =>
  input.split('\n');

export const lineWise = (...mapper) =>
  (input) =>
    (lines=>mapper.reduce((a,c)=>
      a.map(c),lines))
  (linify(input));

export const gridWise = (...mapper) =>
  (input) =>
    lineWise(splitify(),chunks=>
      mapper.reduce((a,c)=>
        a.map(c),chunks))(input);

export const numberfy = (items) =>
  items.map(d=>isNaN(d)?d:+d);

export const chunkify = (items, regex = /[-\w]+/g) =>
  items.map((item) => item.match(regex));

export const splitify = (regex='')=>
  (item)=>item.split(regex);

export const test = (items, regex) =>
  items.filter((item) => regex.test(item));

export const matcher = (regex, n) =>
  (item => item.match(regex).slice(1,1+n));

export const gridify = (input) =>
  lineWise(splitify())(input);

export const seperate = (input, seperator = /^\s*$/) =>
  linify(input).reduce(([[...a],...r],c)=>
    seperator.test(c)?[[],a,...r]:[[...a,c],...r],[[]])
  .reverse();