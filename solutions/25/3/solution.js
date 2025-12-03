const mji = (b,n)=> {
  const max = [];
  let arr = b;
  for (let i=n;i-->0;) {
    const m = arr.slice(0,arr.length-i)
      .reduce((a,c)=>c>a?c:a);
    const j = arr.indexOf(m);
    max.push(m);
    arr = arr.slice(j+1);
  }
  return +max.join('');
}

export const part1 = (input) => 
  input.reduce((a,b)=>mji(b,2)+a,0);

export const part2 = (input) =>  {
  return input.reduce((a,b)=>mji(b,12)+a,0);
}

export const init = (data) =>
  data.split('\n')
    .map(r=>r.split('').map(d=>+d));