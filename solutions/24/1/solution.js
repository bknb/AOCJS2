import {linify} from '#parser';
import {insertSorted, sum} from '#helper';

export const part1 = ([left, right]) =>
  sum(left.map((x, i) => Math.abs(right[i] - x)));

export const part2 = ([left, right]) => 
  sum(left.map(v =>
    v * right.filter(x => x === v).length));

export const init = (data) =>
  linify(data)
    .map(line => line.split(/\s+/))
    .reduce(([left, right],[a,b]) => [
      insertSorted(left, +a),
      insertSorted(right, +b)
    ], [[], []]);