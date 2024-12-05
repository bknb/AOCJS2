import {seperate, chunkify, numberfy} from '#parser';

const sumMids = (input) => 
  input.map(r=>r[(r.length/2)|0])
    .reduce((a,c)=>a+c);

export const part1 = ([rules,pn]) =>
  sumMids(pn.filter(correctOrder(rules)));

export const part2 = ([rules,pn]) => 
  sumMids(pn.filter(p=>!correctOrder(rules)(p))
    .map(bringInCorrectOrder(rules)));

const checkLeft = (rules,p,pn,i) => 
  rules.filter(([l])=>l===p)
  .every(([,r])=>(j => j<0 || j>i)
    (pn.findIndex(p=>p===r)));

const checkRight = (rules,p,pn,i) => 
  rules.filter(([,r])=>r===p)
  .every(([l])=>pn.findIndex(p=>p===l) < i);

function correctOrder(rules) {
  return (pn) => pn.every((p,i)=>
    checkLeft(rules,p,pn,i)
    && checkRight(rules,p,pn,i));
}

function bringInCorrectOrder(rules) {
  return (pn) => pn.sort((a,b)=>
    rules.find(([l,r])=>l===b&&r===a)?1
    :(rules.find(([l,r])=>l===a&&r===b)?-1:0));
}

export const init = (data) => 
  seperate(data)
    .map(s=>chunkify(s)
      .map(numberfy));