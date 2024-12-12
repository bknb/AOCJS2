import {count, checkCharNM} from '#helper';

export const part1 = (input) => 
  count(input,([min,max,letter,password])=>
    checkCharNM(min,max,letter,password));

export const part2 = (input) => 
  count(input,([n,m,letter,password])=>
    (password[n-1]==letter)!=(password[m-1]==letter))

export const init = (data) => 
  data.split('\n').map(x=>x.match(/\w+/g));