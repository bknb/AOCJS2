const freq = (input) =>
  input.slice(1).reduce(([a,...r],c)=>
    [a+c,a,...r],[input[0]])

export const part1 = (input) =>
  freq(input)[0];

export const part2 = (input) => {
  const l = [];
  let v = 0, i = -1;
  while(!l.includes(v)&&l.push(v))
    v+=input[i=(i+1)%input.length];
  return v;
}

export const init = (data) =>
  data.split('\n').map(x=>+x);