import {log, debug,
        testC, mainC, highC,
        time1C, time2C, inputC, rainbow} 
  from './display.js';
import {TESTD, DEBUG, VERBOSE, INPUT} from './prompts.js';
import fs from 'fs';
import chalk from 'chalk';

const {bgRed: error} = chalk;

let [path, options] = process.argv.slice(2);
options = options?.split(',')||[];
let debugEnabled = options.includes(DEBUG);
let verboseError = options.includes(VERBOSE);
let testEnabled = options.includes(TESTD);
let printInput = options.includes(INPUT);

import(`../${path}/solution.js`)
  .then(handleSolution);

function handleSolution(solution) {
  const { init } = solution;
  const [year, day] = path.match(/\d+/g);
  
  let header = mainC(`Solutions(${year}-${day})`);
  if (testEnabled) header+=testC(' ~~Test');
  log(header);

  const dataPath = `${path}/${testEnabled?'test':'input'}.txt`;

  const [data, loadTime] =
    timedExecution(fs.readFileSync, dataPath, 'utf8');
  const [input, prepTime] =
    timedExecution(init, data);
  if (printInput)
    log(inputC('Input:'), input);
  log(time1C(`loaded in ${loadTime}ms`));
  log(chalk.greenBright(`prepared in ${prepTime}ms`));

  [1,2].filter(part=>options.includes(`part${part}`))
    .forEach(part => {
      process.stdout.write(highC(`\nSolution${part}: `));
      const [output, time] =
        timedExecution(solution[`part${part}`], input);
      log(output);
      log(time2C(`in ${time}ms`));
    });
  log();
}

function timedExecution(fn, ...args) {
  const start = performance.now();
  let result;
  try{
    result = fn(...args);
  } catch({name,message,stack}){
    let file = '';
    const match = stack.match(/\(file:\/\/(.*)\)/);
    if (match) [,file] = stack.match(/\(file:\/\/(.*)\)/);
    result = verboseError ? '\n'+stack 
      :`\n${error(name)}:\n${message}`
      +`\nat ${rainbow(file.length/2)(file)}`;
  };
  const end = performance.now();
  return [result, (end-start).toFixed(2)];
}

export const isDebug = () => debugEnabled;
export const isTest = () => testEnabled;