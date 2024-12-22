import {log} from '#display';
import {rng,cached} from '#helper';
import * as parser from '#parser';

const iter = 2000;
const chg = [6,-5,11];

export const part1 = (input) =>
  rng(iter).reduce((a,c)=>a.map(next),input)
    .reduce((a,c)=>a+c);

const next = n => 
  chg.reduce((a,c)=>calc(a,c),n);

const calc = (n,m)=>prune(mix(n<<BigInt(m),n));
const mix = (n,m)=>n^m;
const prune = n=>n%16777216n;
const add = (a,n,m=Number(n%10n))=>a.push(m);

export const part2 = (input) => {
  const prices = input.map(n=>{
    const res = [];
    for (let i=iter;i-->0;)
      add(res,n=next(n));
    return res;
  });
  log(prices);
  const combs = 
  rng(-9,10).map(a=>
    rng(a<0?-9-a:-9,a>0?10-a:10).map(b=>
      rng(b<0?-9-b:-9,b>0?10-b:10).map(c=>
        rng(c<0?-9-c:-9,c>0?10-c:10).map(d=>
          [a,b,c,d]))
          .flat()).flat()).flat();
  const aw = combs.map(c=>
    allWin(c,prices));
  return aw.reduce((a,c)=>Math.max(a,c),0);
};

const allWin = (comb,prices)=> 
  prices.map(p=>win(comb,p)).reduce((a,c)=>a+c,0);

const win = ([a,b,c,d],p)=>
  p.slice(4).find((_,i)=>
    (p[i+4]-p[i+3]==d)&&
    (p[i+3]-p[i+2]==c)&&
    (p[i+2]-p[i+1]==b)&&
    (p[i+1]-p[i]==a)) || 0;

export const init = (data) => 
  data.split('\n').map(x=>BigInt(x));