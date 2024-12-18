import {log} from '#display';
import {rng, allNext, mapGrid,oob} from '#helper';
import {isTest} from '#solver';

let range;
let bytes;

export const part1 = (input) => {
  const grid =rng(range).map((r,y)=>rng(range).map((c,x)=>
    input.slice(0,bytes).some(([i,j])=>x==i&&y==j)?'#':'.'));
  const dm = getDM([[0,0]],grid);
  //printDM(dm);
  return dm[range-1][range-1];
};

const printDM = (dm)=> {
  log();
  log(dm.map(r=>
    r.map(x=>
      x==Infinity?'.'
      :(x>9?String.fromCharCode(x+55):x))
    .join('')).join('\n'));
}

const getDM = (s,g) => {
  const ds = mapGrid(g,_=>Infinity);
  const vs = new Set();
  let q = [];
  s.forEach(([x,y])=>{
    q.push(x+','+y);
    ds[x][y]=0;
  });
  let c;
  while (c=q.shift()?.split(',')) {
    const ns = allNext(c,true)
      .filter(([x,y])=>
        !oob(x,y,g)&&g[x][y]!='#');
    const cw = ds[c[0]][c[1]];
    vs.add(c.join(','));
    ns.forEach(n=> {
      const w = cw+1;
      if (ds[n[0]][n[1]]>w) 
        ds[n[0]][n[1]]=w;
      if (!vs.has(n.join(',')))
        q=[...new Set([...q,n.join(',')])];
    });
  }
  return ds;
}

export const part2 = (input) => {
  while (++bytes&&part1(input)!==Infinity);
  return input[bytes-1].join(',');
};

export const init = (data) => 
  (range=isTest()?7:71)&&
  (bytes=isTest()?12:1024)&&
  data.split('\n').map(r=>
    r.split(',').map(x=>+x));