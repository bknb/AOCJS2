export const part1 = (input) =>
  input.map(x=>x.match(/\d+/g))
    .filter(x=>x)
    .reduce((c,[a,b])=>c+a*b,0);

export const part2 = (input) => 
  input.map(x=>x.match(/\d+/g)||/o\(/.test(x))
    .reduce(([r,t],x)=>
      typeof x === 'boolean' ? [r,x] :
      [t?r+x[0]*x[1]:r,t], [0,true])[0];

export const init = (data) =>
  data.match(/mul\(\d+,\d+\)|do(n't)?\(\)/g);