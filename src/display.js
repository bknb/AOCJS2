import {isDebug} from './solver.js';
import {HSV2RGB, shiftHSV, visGrid} from './helper.js';
import chalk from 'chalk';

export const testC = chalk.italic.bold;
export const mainC = chalk.blue.bold;
export const highC = chalk.red.bold;
export const time1C = chalk.yellow;
export const time2C = chalk.magenta;
export const inputC = chalk.rgb(20,180,20);

export const rainbow = (step)=> (str) => {
  let result = '';
  let color = shiftHSV([0,0.8,0.8],20);
  for (let i = 0; i < str.length; i++)
    result+=chalk.rgb(
      ...HSV2RGB(color = shiftHSV(color,step)))(str[i]);
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

export const logGrid = (grid, {framed, map}={}) =>
  console.log(visGrid(framed,map)(grid)) || grid;

export const oLog = (obj) => 
  console.log(
    Object.entries(obj)
    .reduce((a,[k,v])=>
      a+k+':'+v+' ',''));

export const clear = () => console.clear();