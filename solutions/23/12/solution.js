import {log} from '#display';
import {remove} from '#helper';

const trim = ([p,gs]) =>
  [remove(p, /^\.+|\.+$/g),gs];

const mmr = ([p,gs]) =>
  (r=>[p.replace(new RegExp(r,'g'),'#'),gs])
  (`.(?=(?=.{0,${gs[gs.length-1]-1}}$)[^#]*#)`);

const rml = ([p,[g,...rest]]) =>
  (r=>r.test(p)?[p.replace(r,''),rest]:[p,g?[g,...rest]:rest])
  (new RegExp(`^\\?{0,${g}}#{${g}}[^#]?`,'g'));

const rev = ([p,gs]) =>
  [p.split('').reverse().join(''),gs.reverse()];

export const part1 = (input) => {
  for (let j=input.length;j-->0;) {
    let data = input[j];
    for (let i=5;i-->0;)
      if (typeof log(data) !== 'number')
        data = reduc(data);
    log(solve(data));
  }
}

const solve = ([p,gs]) => {
  switch(gs.length) {
    case 0: return 1;
    case 1: return reducSingle([p,gs]);
    default:
      return [p,gs];
  }
}

const reducSingle = ([p,gs]) => {
  p = p.replace(/#.*#/,m=>m.replace(/./g,'#'));
  p = p.replace(/#+/g,m=>{
    gs[0]-=m.length;
    return '';
  });
  return gs[0]?[p,gs]:1;
}

const reduc = (data) =>
  rev(rml(mmr(trim(rev(rml(mmr(trim(data))))))));

export const part2 = (input) =>
  // Write your code here
  'Solution2';

export const init = (data) =>
  data.split('\n')
  .map(x=>x.split(' '))
  .map(([p,gs])=>[p,gs.split(',').map(x=>+x)]);