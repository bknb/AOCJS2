export const part1 = (input) =>
  input.map(x=>(x/3|0)-2).reduce((a,c)=>a+c);

const allFuel = (mass) =>
  (fuel=>fuel>0?fuel+allFuel(fuel):0)
  ((mass/3|0)-2)

export const part2 = (input) =>
  input.map(allFuel).reduce((a,c)=>a+c);

export const init = (data) =>
  data.split('\n').map(x=>+x);