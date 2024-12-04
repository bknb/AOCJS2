import {execute} from './src/solver.js';
import * as prompt from './src/prompts.js';
import fs from 'fs';

const RECURSIVE = { recursive: true };

prompt.intro().then(createStep);

function createStep({action}) {
  if (action === prompt.CREATE)
    prompt.createNew().then(createNewStep);
  else chooseSolutionStep();
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
  import(`${getPath(answer)}/solution.js`)
    .then(solution => {
      execute(solution, answer.options, getPath(answer));
      prompt.rerun().then(({rerun})=>
        rerun&&solveOptionsStep(answer))
    });
}

function getPath({year, day}) {
  return `./solutions/${year}/${day}`;
}