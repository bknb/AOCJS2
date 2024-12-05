import {seperate, chunkify, numberfy} from '#parser';

export const part1 = ([rules,pn]) =>
  pn.filter(correctOrder(rules))
    .map(r=>r[Math.floor(r.length/2)])
    .reduce((a,c)=>a+c);

export const part2 = ([rules,pn]) => 
  pn.filter(p=>!correctOrder(rules)(p))
    .map(bringInCorrectOrder(rules))
    .map(r=>r[Math.floor(r.length/2)])
    .reduce((a,c)=>a+c);

const checkLeft = (rules,p,pn,i) => 
  rules.filter(([l])=>l===p)
  .every(([,r])=>(j => j===-1 || j>i)
    (pn.findIndex(p=>p===r)));

const checkRight = (rules,p,pn,i) => 
  rules.filter(([,r])=>r===p)
  .every(([l])=>pn.findIndex(p=>p===l) < i);

function correctOrder(rules) {
  return (pn) => pn.every((p,i)=>
    checkLeft(rules,p,pn,i)&&checkRight(rules,p,pn,i));
}

function bringInCorrectOrder(rules) {
  return (pn) => pn.sort((a,b)=>
    rules.find(([l,r])=>l===b&&r===a)?1
    :(rules.find(([l,r])=>l===a&&r===b)?-1:0));
}

export const init = (data) => {
  const [rules,pn] = seperate(data);
  return [
    chunkify(rules).map(numberfy),
    chunkify(pn).map(numberfy)
  ];
}