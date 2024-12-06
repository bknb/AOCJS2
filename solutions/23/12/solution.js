import {log} from '#display';
import {remove} from '#helper';

const trim = ([p,gs]) =>
  [remove(p, /^\.+|\.+$/g),gs];

const mmr = ([p,gs]) =>
  (r=>[p.replace(new RegExp(r,'g'),'#'),gs])
  (`.(?=(?=.{0,${gs[gs.length-1]-1}}$)[^#]*#)`);

const rml = ([p,[g,...rest]]) =>
  (r=>r.test(p)?[p.replace(r,''),rest]:[p,[g,...rest]])
  (new RegExp(`^\\?{0,${g}}#{${g}}[^#]?`,'g'));

const rev = ([p,gs]) =>
  [p.split('').reverse().join(''),gs.reverse()];

export const part1 = (input) => {
  let value = input.map(x=>rml(mmr(trim(x))));
  value = value.map(x=>rev(x));
  value = value.map(x=>rml(mmr(trim(x))));
  value = value.map(x=>rev(x));
  value = value.map(x=>rml(mmr(trim(x))));
  value = value.map(x=>rev(x));
  value = value.map(x=>rml(mmr(trim(x))));
  value = value.map(x=>rev(x));
  value = value.map(x=>rml(mmr(trim(x))));
  value = value.map(x=>rev(x));
  value = value.map(x=>rml(mmr(trim(x))));
  value = log(value.map(x=>rev(x)),'rev');
}

export const part2 = (input) =>
  // Write your code here
  'Solution2';

export const init = (data) =>
  data.split('\n')
  .map(x=>x.split(' '))
  .map(([p,gs])=>[p,gs.split(',').map(x=>+x)]);