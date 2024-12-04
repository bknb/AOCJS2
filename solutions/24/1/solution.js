import {log} from '#solver';
import {linify} from '#parser';
import {insertSorted, sum} from '#helper';

export const part1 = ([left, right]) =>
  sum(left.map((x, i) => Math.abs(right[i] - x)));

export const part2 = ([left, right]) => {
  const results = [];
  return sum(left.map(v =>
    v * (results[v] ||
         (results[v] = right.filter(x => x === v).length))));
}

export const init = (data) => {
  const left = [], right = [];
  linify(data)
    .map(line => line.split(/\s+/))
    .forEach(([a, b]) => {
      insertSorted(left, +a);
      insertSorted(right, +b);
    });
  return [left, right];
}