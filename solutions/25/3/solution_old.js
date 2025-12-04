const mji = (b,n)=> {
  const max = [];
  for (let i=n;i-->0;) {
    max.unshift(b.slice(0,b.length-i)
      .reduce((a,c)=>c>a?c:a));
    b = b.slice(b.indexOf(max[0])+1);
  }
  return +max.reverse().join('');
}

export const part1 = (input) =>
  input.reduce((a,b)=>mji(b,2)+a,0);

export const part2 = (input) =>
  input.reduce((a,b)=>mji(b,12)+a,0);

export const init = (data) =>
  data.split('\n')
    .map(r=>r.split('').map(d=>+d));