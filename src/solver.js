import {log, clear, debug,
        testC, mainC, highC,
        time1C, time2C, inputC, rainbow} 
  from './display.js';
import {TESTD, DEBUG, VERBOSE} from './prompts.js';
import fs from 'fs';
import chalk from 'chalk';

const {bgRed: error} = chalk;
let debugEnabled = false;
let verboseError = false;

let [path, options] = process.argv.slice(2);
options = options.split(',');
import(`../${path}/solution.js`)
  .then(handleSolution);

function handleSolution(solution) {
  const { init } = solution;
  const [year, day] = path.match(/\d+/g);
  const isTest = options.includes(TESTD);

  clear();
  let header = mainC(`Solutions(${year}-${day})`);
  if (isTest) header+=testC(' ~~Test');
  log(header);

  debugEnabled = options.includes(DEBUG);
  verboseError = options.includes(VERBOSE);
  const dataPath = `${path}/${isTest?'test':'input'}.txt`;

  const [data, loadTime] =
    timedExecution(fs.readFileSync, dataPath, 'utf8');
  const [input, prepTime] =
    timedExecution(init, data);
  debug(inputC('Input:'), input);
  debug(time1C(`loaded in ${loadTime}ms`));
  debug(time1C(`prepared in ${prepTime}ms`));

  [1,2].filter(part=>options.includes(`part${part}`))
    .forEach(part => {
      const [output, time] =
        timedExecution(solution[`part${part}`], input);
      log(highC(`\nSolution${part}: `) + output);
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
      +`\nat ${rainbow(2*360/file.length)(file)}`;
  };
  const end = performance.now();
  return [result, (end-start).toFixed(2)];
}

export const isDebug = () => debugEnabled;