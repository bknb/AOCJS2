export const part1 = (cs) => {
  const ts = [...cs.keys().filter(([k])=>k.startsWith('t'))];
  return new Set(ts.map(c=>ps(c,cs)).flat().map(x=>x.sort().join())).size;
};

export const part2 = (cs) => biggest(cs);

export const init = (data) => {
  const cs = new Map();
  data.split('\n').map(r=>r.split('-'))
  .forEach(([a,b])=>{
    if (cs.get(a)) cs.get(a).push(b);
    else cs.set(a,[b]);
    if (cs.get(b)) cs.get(b).push(a);
    else cs.set(b,[a]);
  });
  return cs;
}

const ps = (c,cs)=> {
  const ns = cs.get(c);
  const pairs = [];
  for (let i=0;i<ns.length-1;i++)
    pairs.push(...ns.slice(i+1).map(n=>[ns[i],n]));
  return pairs.filter(([a,b])=>cs.get(a).includes(b)).map(p=>[c,...p]);
}

const biggest = cs=> {
  let pos = [...cs.entries().map(([k,v])=>[[k],v])];
  while(true) {
    pos = [...new Map(pos.map(([c,r])=>r.map(x=>
      [[x,...c],r.filter(y=>y!=x)])).flat()
      .map(([c,r])=>[c.sort().join(),r.filter(y=>
      c.every(x=>cs.get(x).includes(y)))]))];
    if (pos.length==1) break;
    pos = pos.filter(([_,r])=>r.length).map(([k,v])=>[k.split(','),v]);
  }
  return pos[0][0];
}