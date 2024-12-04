import {execSync} from 'child_process';
import * as prompt from './src/prompts.js';
import fs from 'fs';

const RECURSIVE = { recursive: true };

startStep();

function startStep() {
  prompt.intro().then(decisionStep);
}

function decisionStep({action}) {
  switch(action) {
    case prompt.CREATE:
      prompt.createNew().then(createNewStep);
      break;
    case prompt.SOLVE:
      chooseSolutionStep();
      break;
    default:
  }
}

function createNewStep(answer) {
  fs.mkdirSync(getPath(answer), RECURSIVE);
  fs.cpSync('./.solution_template', getPath(answer), RECURSIVE);
  solveOptionsStep(answer);
}

function chooseSolutionStep() {
  prompt.solve().then(solveOptionsStep);
}

function solveOptionsStep(answer) {
  prompt.solveOptions(answer).then(solveStep);
}

function solveStep(answer) {
  const opts = answer.options.join();
  const path = getPath(answer);
  const command = `node src/solver.js ${path} ${opts}`;
  execSync(command, { stdio: 'inherit' });
  prompt.rerun().then(({rerun}) => {
    if (rerun) solveOptionsStep(answer);
    else startStep();
  });
}

function getPath({year, day}) {
  return `./solutions/${year}/${day}`;
}