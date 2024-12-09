export const part1 = (input) => 
  input.match(/([-\d]+)/g)?.map(x=>+x)
  .reduce((a,c)=>a+c)|0;

export const part2 = (input) => {
  let last;
  while(last!=input) {
    last = input;
    input = input
      .replace(/\[[^\{\}\]\[]*\]/,match=>match
        &&`"${part1(match)}"`)
      .replace(/\{[^\{\}\]\[]*\}/,match=>/"red"/.test(match)
        ?"\"0\"":`"${part1(match)}"`);
  }
  return part1(input);
}

export const init = (data) => data;