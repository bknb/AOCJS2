import {log, testC, mainC, highC, time1C, time2C, inputC} from './display.js';
import {TESTD, DEBUG} from './prompts.js';
import fs from 'fs';

let debug = false;

let [path, options] = process.argv.slice(2);
options = options.split(',');
import(`../${path}/solution.js`)
  .then(handleSolution);

function handleSolution(solution) {
  const { init } = solution;
  const useTestData = options.includes(TESTD);

  if (useTestData) console.log(testC('~~TestRun~~'));

  debug = options.includes(DEBUG);
  const dataPath = `${path}/${useTestData?'test':'input'}.txt`;

  const [data, loadTime] =
    timedExecution(fs.readFileSync, dataPath, 'utf8');
  const [input, prepTime] =
    timedExecution(init, data);

  log(inputC('Input:'), input);
  console.log(time1C(`loaded in ${loadTime}ms`));
  console.log(time1C(`prepared in ${prepTime}ms\n`));

  [1,2].filter(part=>options.includes(`part${part}`))
    .forEach(part => {
      console.log(`╭╴╺━━━╸╶╮\n│${mainC(`Part ${part}:`)}│\n╰╴╺━━━╸╶╯`);
      const [output, time] =
        timedExecution(solution[`part${part}`], input);
      console.log(highC('Solution: ') + output);
      console.log(time2C(`in ${time}ms\n`));
    });
}

function timedExecution(fn, ...args) {
  const start = performance.now();
  const result = fn(...args);
  const end = performance.now();
  return [result, (end-start).toFixed(2)];
}

export const isDebug = () => debug;