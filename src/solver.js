import {log, clear, debug,
        testC, mainC, highC,
        time1C, time2C, inputC} 
  from './display.js';
import {TESTD, DEBUG} from './prompts.js';
import fs from 'fs';

let debugEnabled = false;

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
  const result = fn(...args);
  const end = performance.now();
  return [result, (end-start).toFixed(2)];
}

export const isDebug = () => debugEnabled;