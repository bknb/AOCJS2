import {isDebug} from './solver.js';
import chalk from 'chalk';

export const testC = chalk.italic.bold;
export const mainC = chalk.blue.bold;
export const highC = chalk.red.bold;
export const time1C = chalk.yellow;
export const time2C = chalk.magenta;
export const inputC = chalk.rgb(10,20,230);

export const log = (...text) =>
  (isDebug() && console.log(...text)) || text[0];

export const condLog = (condition, ...text) =>
  (isDebug() && condition && console.log(...text)) || text[0];