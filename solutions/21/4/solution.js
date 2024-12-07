import {sumGrid} from '#helper';
import {seperate, numberfy, chunkify} from '#parser';

export const part1 = ([draws,cards]) =>
  draws.slice(0).reduce((a,v,i,arr)=>{
    const newCards = a.map(c=>mark(c,v));
    const winner = newCards.find(checkWin);
    if (winner) {
      arr.splice(1);
      return sumGrid(winner)*v;
    }
    return newCards;
  }, cards);

export const part2 = ([draws,cards]) => 
  draws.slice(0).reduce((a,v,i,arr)=>{
    let newCards = a.map(c=>mark(c,v));
    const winner = newCards.find(checkWin);
    if (winner) {
      if(newCards.length===1) {
        arr.splice(1);
        return sumGrid(newCards[0])*v;
      }
      newCards = newCards.filter(x=>!checkWin(x));
    }
    return newCards;
  }, cards);

function mark(card, value) {
  return card.map(r=>r.map(c=>c===value?null:c));
} 

function checkWin(card) {
  return card.some(r=>r.every(x=>x===null)) ||
    card[0].some((r,i)=>
      card.map(r=>r[i]).every(x=>x===null));
}

export const init = (data) => {
  const [[draws], ...cards] = seperate(data);
  return [
    numberfy(draws.split(',')),
    cards.map(c=>chunkify(c)
      .map(numberfy()))
  ];
}