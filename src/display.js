import {isDebug} from './solver.js';
import chalk from 'chalk';

export const testC = chalk.italic.bold;
export const mainC = chalk.blue.bold;
export const highC = chalk.red.bold;
export const time1C = chalk.yellow;
export const time2C = chalk.magenta;
export const inputC = chalk.rgb(20,180,20);

const hsv2rgb = ([h,s,v]) => {
  let r, g, b;
  const j = h / 60;
  const i = j|0;
  const f = j - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }
  return [
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255)
  ];
};

const shift = ([h,s,v],shift)=>[(h+shift)%360,s,v];

export const rainbow = (step)=> (str) => {
  let result = '';
  let color = shift([0,0.8,0.8],20);
  for (let i = 0; i < str.length; i++)
    result+=chalk.rgb(
      ...hsv2rgb(color = shift(color,step)))(str[i]);
  return result;
}
  

export const debug = (...text) =>
  (isDebug() && console.log(...text)) || text[0];

export const condLog = (condition, ...text) =>
  (condition && console.log(...text)) || text[0];

export const cLog = (r,g,b) =>
  text=>console.log(chalk.rgb(r,g,b)(text))||text;

export const log = (...text) =>
  console.log(...text) || text[0];

export const error = (...text) =>
  console.error(...text) || text[0];

export const logGrid = (grid, map='.#') =>
  console.log(grid.map(x=>x.map(x=>map[~~x]||'#')
    .join('')).join('\n')) || grid;

export const oLog = (obj) => 
  console.log(
    Object.entries(obj)
    .reduce((a,[k,v])=>
      a+k+':'+v+' ',''));

export const clear = () => console.clear();