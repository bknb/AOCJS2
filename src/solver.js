import {TESTD, DEBUG} from './prompts.js';
import chalk from 'chalk';
import fs from 'fs';

let debug = false;

const test = chalk.italic.bold;
const main = chalk.blue.bold;
const high = chalk.red.bold;
const time1 = chalk.yellow;
const time2 = chalk.magenta;

export const execute = (solution, options, path) => {
  const { init } = solution;
  const useTestData = options.includes(TESTD);
  
  if (useTestData) console.log(test('~~TestRun~~'));
  
  debug = options.includes(DEBUG);
  const dataPath = `${path}/${useTestData?'test':'input'}.txt`;

  const [data, loadTime] = timedExecution(fs.readFileSync, dataPath, 'utf8');
  const [input, prepTime] = timedExecution(init, data);

  log(chalk.blue('Input:'), input);
  console.log(time1(`loaded in ${loadTime}ms`));
  console.log(time1(`prepared in ${prepTime}ms\n`));

  [1,2].filter(part=>options.includes(`part${part}`))
    .forEach(part => {
      console.log(`-------\n${main(`Part ${part}:`)}\n-------`);
      const [output, time] = timedExecution(solution[`part${part}`], input);
      console.log(high('Solution: ') + output);
      console.log(time2(`in ${time}ms\n`));
    });
}

function timedExecution(fn, ...args) {
  const start = performance.now();
  const result = fn(...args);
  const end = performance.now();
  return [result, (end-start).toFixed(2)];
}

export const log = (...text) => {
  if(debug) console.log(...text);
  return text[0];
}