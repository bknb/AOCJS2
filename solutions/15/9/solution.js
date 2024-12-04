import {log} from '#solver';
import {allBut} from '#helper';
import {linify, numberfy, matcher} from '#parser';

export const part1 = ([e,w]) => {
  return w.sort(([a],[b])=>a-b);
}

export const part2 = (input) => {
  // Write your code here
  return 'Solution2';
}

export const init = (data) => 
  linify(data)
    .map(matcher(/(\w+) to (\w+) = (\d+)/, 3))
    .map(numberfy)
    .reduce(([e,w],[a,b,d])=>
      [e.add(a).add(b),[[d,a,b],...w]], [new Set(),[]]);