export const part1 = (input) =>
  input.map(r=>r.reduce((a,c)=>Math.max(a,c))
    -r.reduce((a,c)=>Math.min(a,c)))
  .reduce((a,c)=>a+c,0);

export const part2 = (input) => 
  input.slice().map(r=>
    r.reduce((a,c,i,arr)=>a
      ?arr.splice(1)&&a
      :(sr=>sr?c/sr:0)
      (arr.find((x,j)=>
        i!==j&&!(c%x))),0))
  .reduce((a,c)=>a+c,0);

export const init = (data) => 
  data.split('\n').map(r=>r.match(/\d+/g).map(x=>+x));