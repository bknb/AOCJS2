import {log} from '#display';

export const part1 = (input) => {
  log(input.map(pos));
}

export const part2 = (input) =>
  // Write your code here
  'Solution2';

export const init = (data) =>
  data.split('\n')
  .map(x=>x.split(' '))
  .map(([p,gs])=>[p,gs.split(',').map(x=>+x)]);

const pos = ([p,gs]) => {
  log(p,gs);
  let lp;
  do {
    lp = p;
    p = p.replace(/^\.+|\.+$/g,'');
    p = p.replace(/^#+/g,m=>
      (m.length<gs[0]?gs[0]-=m.length:gs.shift())&&'');
    const l = gs.length-1;
    p = p.replace(/#+$/g,m=>
      (m.length<gs[l]?gs[l]-=m.length:log(gs).pop())&&'');
  } while (gs.length && lp!==p);
  log(p,gs);
  if (!gs.length||minSp(gs)==p.length) return 1;
  const ps = p.split(/\.*/);
}

const minSp = gs=>gs.reduce((a,b)=>a+b+1);