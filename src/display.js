import {isDebug} from './solver.js';
import chalk from 'chalk';

export const testC = chalk.italic.bold;
export const mainC = chalk.blue.bold;
export const highC = chalk.red.bold;
export const time1C = chalk.yellow;
export const time2C = chalk.magenta;
export const inputC = chalk.rgb(20,180,20);

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

export const logGrid = (grid) =>
  console.log(grid.map(x=>x.map(x=>x?'#':'.')
    .join('')).join('\n')) || grid;

export const clear = () => console.clear();