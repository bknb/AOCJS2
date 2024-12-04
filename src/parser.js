export const linify = (input) =>
  input.split('\n');

export const numberfy = (items) =>
  items.map(d=>isNaN(d)?d:+d);

export const chunkify = (items, regex = /[-\w]+/g) =>
  items.map((item) => item.match(regex));

export const test = (items, regex) =>
  items.filter((item) => regex.test(item));