import fs from 'fs';
import inquirer from 'inquirer';
import { list, input, confirm, checkbox } from './options.js';

export const CREATE = 'create';
export const SOLVE = 'solve';
export const END = 'end';
export const DEBUG = 'debug';
export const INPUT = 'input';
export const PART1 = 'part1';
export const PART2 = 'part2';
export const TESTD = 'testD';
export const VERBOSE = 'verbose';

export const intro = () => inquirer
  .prompt([
    list('action')
      .message('What do you want to do?')
      .add('create a new solution', CREATE)
      .add('solve', SOLVE, fs.existsSync('./solutions'))
      .add('end the programm', END)
      .default(SOLVE)
  ].map(x=>x()));

export const solve = () => inquirer
  .prompt([
    list('year')
      .message('Which year?')
      .choices(getAllYears),
    list('day')
      .message('Which day?')
      .choices(getAllDaysForSelection)
    ].map(x=>x()));

export const createNew = () => inquirer
  .prompt([
    input('year')
      .message('Which year?')
      .validate((n)=>/\d{2}/.test(n)),
    input('day')
      .message('Which day?')
      .validate((n)=>/\d{1,2}/.test(n))
    ].map(x=>x()));

export const rerun = () => inquirer
  .prompt([
    confirm('rerun')
      .message('Want to rerun it?')
  ].map(x=>x()));

export const solveOptions = (answer) => inquirer
  .prompt([
    checkbox('options',answer)
      .message('What do you want?')
      .add('Test', TESTD)
      .add('Input', INPUT, false)
      .add('Debug', DEBUG, false)
      .add('Part 1', PART1)
      .add('Part 2', PART2)
      .add('verbose Errors', VERBOSE, false)
    ].map(x=>x()), answer);

function getDirectories(path) {
  return fs.readdirSync(path, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => +item.name);
}

function getAllYears() {
  return getDirectories('./solutions')
   .sort((a, b) => b - a);
}

function getAllDaysForSelection({year}) {
  return getDirectories(`./solutions/${year}`)
    .sort((a, b) => b - a);
}