export const part1 = ([ops,ns]) =>
  ops.reduce((a,ia,i)=>a+ns[i].reduce((a,c)=>ia?a+c:a*c,ia?0:1),0);

export const part2 = ([ops,,ns]) =>
  ops.reduce((a,ia,i)=>a+ns[i].reduce((a,c)=>ia?a+c:a*c,ia?0:1),0);

export const init = (data) => {
  const r = data.split('\n');
  const l = r.length-1;
  const opr = r[l].match(/.\s+/g);
  const ops = opr.map(op=>op.trim()==='+');
  const nums = [];
  let s = 0;
  for (let i=0;i<ops.length;i++) {
    const ns = [];
    let nl = opr[i].length;
    for (let j=0;j<l;j++)
      ns.push(r[j].substring(s,s+nl));
    s+=nl;
    nums.push(ns);
  }
  const nums2 = nums.map(ns=> {
    const ns2 = [];
    for (let i=0;i<ns[0].length;i++) {
      let n = ''
      for (let j=0;j<ns.length;j++)
        n+=ns[j][i];
      ns2.push(n);
    }
    return ns2;
  });
  return [ops,nums.map(r=>r.map(n=>+n).filter(n=>n)),nums2.map(r=>r.map(n=>+n).filter(n=>n))];
}