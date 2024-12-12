import {uniqChars, allNext, bordered,
        rng, count, isInCs} from '#helper';
import {gridify} from '#parser';

export const part1 = (input) => 
  solve(input,fences)

export const part2 = (input) => 
  solve(input,corners);

const solve = ([plants,grid],countFn) =>
  [...getAreas(plants,grid).values()]
    .map(x=>x.map(cost(countFn,([x,y])=>grid[x][y]))
    .reduce((a,c)=>a+c))
    .reduce((a,c)=>a+c);

export const init = (data) => 
  [uniqChars(data).filter(x=>x!='\n'),
   bordered(gridify(data))];

const cost = (fn,v)=>fs=>
  fs.length*fs.map(fn(v))
    .reduce((a,c)=>a+c);;

const corners = value=>coordinate=>
  ((neighbors=allNext(coordinate),
    cell=value(coordinate))=>
    rng(0,4).reduce((accu,direction)=>
      ((dir,orthoDir=(dir+2)%8,
        n1=value(neighbors[dir]),
        n2=value(neighbors[dir+1]),
        n3=value(neighbors[orthoDir]))=>
        (n1==cell)==(cell==n3)
        &&(cell!=n2||cell!=n1)
        ?accu+1:accu)
      (direction*2),0))();

const fences = v=>c=>
    count(allNext(c,true),x=>v(x)!=v(c));

const getArea = (c,i,j,grid,fs) =>
  ((sij=i+','+j)=>
    (grid[i][j]==c&&!fs.has(sij)
     ?fs.add(sij)&&
     allNext([i,j],true).forEach(([x,y])=>
       getArea(c,x,y,grid,fs))
     ||fs:fs))();

const getAreas = (plants,grid)=> {
  const areas = new Map();
  plants.forEach(x=>areas.set(x,[]));
  for(let i=grid.length-1;i-->1;)
    for(let j=grid[i].length-1;j-->1;) {
      const c = grid[i][j];
      const a = areas.get(c);
      if (!a.find(isInCs(i,j)))
        a.push([...getArea(c,i,j,grid,new Set())]
        .map(v=>v.split(',')));
    }
  return areas;
}