export const part1 = ([rs,l]) => 
  l.filter(n=>rs.some(([l,r])=>
    l<=n&&n<=r)).length;

export const part2 = ([rs]) => 
  rs.sort(([a],[b])=>a-b)
    .reduce(([[fl,fr],...rr],[l,r])=>
      l>fr+1?[[l,r],[fl,fr],...rr]
      :[[fl,r>fr?r:fr],...rr],[[0,-1]])
    .reduce((s,[l,r])=>r-l+1+s,0);

export const init = (data) =>
  (([rs,l]) => [
    rs.split('\n').map(r=>
      r.split('-').map(n=>+n)),
    l.split('\n').map(n=>+n)
  ])(data.split('\n\n'));