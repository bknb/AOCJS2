const sumEquals = (input, shift) =>
  input.reduce((a,c,i,arr)=>
    c==arr[(i+shift)%arr.length]?a+c:a,0);

export const part1 = (input) => 
  sumEquals(input, input.length/2);

export const part2 = (input) => 
  sumEquals(input, 1);

export const init = (data) =>
  data.split('').map(x=>+x);