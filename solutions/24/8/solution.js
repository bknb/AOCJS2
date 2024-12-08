import {zeroGrid, oob, sumGrid, vec} from '#helper';
import {gridify} from '#parser';

export const part1 = (input) => 
  solve(input,k=>k===1);

export const part2 = (input) =>
  solve(input);

export const init = (data) => 
  gridify(data);

export const solve = (input, cond) => {
  const anti = zeroGrid(input);
  for (let i=input.length;i-->0;)
    for (let j=input[i].length;j-->0;)
      for (let x=input.length;x-->0;)
        for(let y=input[x].length;y-->0;)
          setAll(input,i,j,x,y,anti,cond);
  return sumGrid(anti);
}

const setAll = (input,i,j,x,y,anti,cond)=>
  (i!=x||j!=y)
  &&(input[i][j]!='.'&&input[i][j]===input[x][y])
  &&((a,b)=>(d=>
    setIt(a,d,anti,cond)
    &&setIt(b,d.neg(),anti,cond))
    (a.sub(b)))
  (vec(i,j),vec(x,y));

const setIt = (a,d,anti,cond,i=0)=> {
  while(!oob(...a,anti)) {
    if (!cond||cond(i++))
      set(a,anti);
    a=a.add(d);
  }
}
const set = ([x,y],input)=>!(input[x][y]=1);