import {log} from '#display';
import {seperate} from '#parser';
import chalk from 'chalk';

let involved = new Set();

export const part1 = ([ws,gs]) => {
  ws = new Map(ws);
  swf('z',gs).map(x=>ev(x,ws,gs));
  return toNum(getN('z',ws));
};

export const part2 = ([ws,gs]) => {
  //log(involved.size-ws.size, gs.length);
  let wsc = new Map(ws);
  const xs = getN('x',wsc);
  const ys = getN('y',wsc);
  //log(swf('z',gs));
  swf('z',gs).map(x=>ev(x,wsc,gs));
  const zs = getN('z',wsc);

  const lvl1 = [...involved].filter(isLvl1);
  const lvl2 = gs.filter(([a,,b])=>lvl1.includes(a)&&lvl1.includes(b)).map(([,,,c])=>c);

  log(gs.filter(([,,,c])=>c.startsWith('z')).sort(([,,,a],[,,,b])=>a>b?-1:1));

  const xss = xs.map(x=>~~x).join('');
  const yss = ys.map(x=>~~x).join('');
  const zss = zs.map(x=>~~x).join('');
  const ez = (Number('0b'+xss)+Number('0b'+yss)).toString(2);
  log(lvl1,lvl1.length);
  log(lvl2,lvl2.length);
  log('  '+xss)
  log('+ '+yss)
  log('-'.repeat(47))
  log(' '+zss.split('').map((x,i)=>x==ez[i]?chalk.green(x):chalk.red(x)).join(''))
  return null;
};

export const init = (data) => {
  const [ws,gs] = seperate(data);
  return [new Map(ws.map(w=>
    w.match(/\w+/g).map(x=>x.length==1?x=='1':x))),
    gs.map(g=>g.match(/\w+/g))
  ];
}

const isLvl1 = a=>a.startsWith('x')||a.startsWith('y');

const ev = ([a,op,b,c],ws,gs) => {
  if (!ws.has(a)) 
    ev(gs.find(([,,,e])=>a==e),ws,gs);
  if (!ws.has(b)) 
    ev(gs.find(([,,,e])=>b==e),ws,gs);
  involved.add(a).add(b);
  ws.set(c,logic(op,ws.get(a),ws.get(b)))
}

const logic = (op,a,b) => {
  switch(op) {
    case 'AND': return a&&b;
    case 'OR': return a||b;
    case 'XOR': return a!=b;
    default: return false;
  }
}

const toNum = ba=> Number('0b'+ba.map(x=>~~x).join(''));
const getN = (l,ws)=>
  [...ws.keys().filter(x=>x.startsWith(l))]
    .sort((a,b)=>a<b?1:-1)
    .map(x=>ws.get(x));

const swf = (l,gs)=>
  gs.filter(([,,,c])=>
    c.startsWith(l))
  .sort(([,,,a],[,,,b])=>b>a?1:-1);