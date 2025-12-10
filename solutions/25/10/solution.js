import {debug, log} from '#display';
import * as helper from '#helper';
import * as parser from '#parser';

const fp = ([ls,,bs])=> {
  dist([false],[false]);
  return few(ls.map(_=>false),[]);
  function few(cl,cd) {
    const ops = bs.map(b=>press(cl,b))
      .map(tl=>[dist(ls,tl),tl])
      .sort(([a],[b])=>a-b);
    return 1;
  }
}

const press = (ls,b)=>
  b.reduce((a,i)=>{a[i]=!a[i];return a},[...ls]);

const dist = (l,g)=>
  l.reduce((a,e,i)=>a+log(+e!==g[i],e,g[i],i),0);

export const part1 = (input) => {
  return input.reduce((a,c)=>fp(c)+a,0);
};

export const part2 = (input) => {
  // Write your code here
  return null;
};

export const init = (data) => 
  data.split('\n').map(r=>r.split(' '))
    .map(es=>[es.shift(),es.pop(),es])
    .map(([ls,we,bs])=>[
      ls.match(/[\.#]/g).map(l=>l==='#'),
      we.match(/\d+/g).map(n=>+n),
      bs.map(b=>b.match(/\d+/g).map(n=>+n))
    ])