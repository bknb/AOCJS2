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

export const log = (...text) =>
  console.log(...text) || text[0];

export const error = (...text) =>
  console.error(...text) || text[0];

export const clear = () => console.clear();