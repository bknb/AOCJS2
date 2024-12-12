const alph = 'abcdefghijklmnopqrstuvwxyz'.split('');

export const part1 = (input) => {
  let last = input;
  do {
    input = alph.reduce((a,c)=>a.replace(c+c.toUpperCase(),''),input);
    input = alph.reduce((a,c)=>a.replace(c.toUpperCase()+c,''),input);
  } while (last != (last = input));
  return input.length;
}

export const part2 = (input) => 
  alph.reduce((a,c)=>
    Math.min(a,part1(
      input.replaceAll(c,'')
      .replaceAll(c.toUpperCase(),''))),Infinity);

export const init = (data) => data