const sumInvInRngs = (input, regex) => {
  let sum = 0;
  for(let i=input.length;i-->0;)
    for(let j=input[i][1]+1;j-->input[i][0];)
      if(regex.test(`${j}`))
        sum += j;
  return sum;
}

export const part1 = (input) =>
  sumInvInRngs(input, /^(\d+)\1$/);

export const part2 = (input) =>
  sumInvInRngs(input, /^(\d+)\1+$/);

export const init = (data) =>
  data.split(',').map(l=>
    l.split('-').map(d=>+d));