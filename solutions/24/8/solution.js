import {zeroGrid,oob,sumGrid} from '#helper';
import {gridWise} from '#parser';

const antMap = 
  '.0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKJMNOPQRSTUVWXYZ';

export const part1 = (input) => 
  solve(input,k=>k===1);

export const part2 = (input) =>
  solve(input);

export const init = (data) => 
  gridWise(x=>antMap.indexOf(x))(data);

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
  &&(input[i][j]&&input[i][j]===input[x][y])
  &&((a,b)=>(d=>
    setIt(a,d,anti,cond)
    &&setIt(b,neg(d),anti,cond))
    (add(a,neg(b))))
  ([i,j],[x,y]);

const setIt = (a,d,anti,cond)=> {
  let i = 0;
  while(!oob(...a,anti)) {
    if (!cond||cond(i++))
      set(a,anti);
    a=add(a,d);
  }
}

const add = (c,d)=>c.map((x,i)=>x+d[i]);
const neg = (c)=>c.map(x=>-x);
const set = ([x,y],input,v=1)=>input[x][y]=v;