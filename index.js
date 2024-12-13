import {execSync} from 'child_process';
import * as prompt from './src/prompts.js';
import fs from 'fs';
import chalk from 'chalk';

const HEADER_PATH = 'src/assets/header.txt';

let HEADER;
if (fs.existsSync(HEADER_PATH))
  HEADER = chalk.rgb(255,128,128).bold(
    fs.readFileSync(HEADER_PATH, 'utf8'));

startStep();

function startStep() {
  if (HEADER) console.log(HEADER);
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
  const RECURSIVE = { recursive: true };
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
  console.clear();
  if (HEADER) console.log(HEADER);
  try{
    execSync(command, { stdio: 'inherit' });
  } catch(e){
    console.log(e);
  }
  prompt.rerun().then(({rerun}) => {
    if (rerun) solveOptionsStep(answer);
    else startStep();
  });
}

function getPath({year, day}) {
  return `./solutions/${year}/${day}`;
}