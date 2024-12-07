import {revCopy} from '#helper';
import { log } from '#display';

const opO = {
  '+': (a, b) => a + b,
  '*': (a, b) => a * b,
  '||': (a, b) => +((''+a)+b),
};

const red = {
  '+': (r,s) => r>s&&r-s,
  '*': (r,s) => !(r%s)&&r/s,
  '||': (s,r) => (ss=>(rep=>ss!=rep&&+rep)
    (ss.replace(new RegExp(`${''+r}$`),'')))(''+s)
};

export const part1 = (input) =>
  input.map(hasSol(['+','*']))
  .map((c,i)=>c?input[i][0]:0)
  .reduce((a,c)=>(a+c),0);
  
export const part2 = (input) =>
  input.map(hasSol(['+','*','||']))
  .map((c,i)=>c?input[i][0]:0)
  .reduce((a,c)=>(a+c),0);

export const init = (data) =>
  data.split('\n').map(x=>
    x.match(/\d+/g).map(x=>+x))
  .map(([r,...ops])=>[r,ops]);

const numOfSols = (opL)=>([r,ops])=>
  [allCombs(opL,revCopy(ops))
   .some(x=>r==x),r];

const allCombs = (opL,[s,...oR]) =>
  !oR.length?[s]:opL.map(o=>
    allCombs(opL,oR)
    .map(x=>opO[o](x,s))).flat();

const hasSol = opL=>([result,list])=>
  recOps(opL,opL,result,revCopy(list));

const recOps = (ao,os,r,ns)=>
  (([o,...oR],[n,...nR])=>
    o&&(!nR.length
    ?r==n:((rr=>rr&&recOps(ao,ao,rr,nR))
    (red[o](r,n))||recOps(ao,oR,r,ns))))(os,ns);
  
  