import fs from 'fs';
import inquirer from 'inquirer';
import { list, input, confirm, checkbox } from './options.js';

export const CREATE = 'create';
export const SOLVE = 'solve';
export const END = 'end';
export const DEBUG = 'debug';
export const PART1 = 'part1';
export const PART2 = 'part2';
export const TESTD = 'testD';

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
      .choices(getDirectories('./solutions')
               .sort((a, b) => b - a)),
    list('day')
      .message('Which day?')
      .choices(({ year }) => getDirectories(`./solutions/${year}`)
              .sort((a, b) => b - a))
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
    {
      type: "confirm",
      name: "rerun",
      message: "Want to rerun it"
    }
  ]);

export const solveOptions = (answer) => inquirer
  .prompt([
    {
      type: "checkbox",
      name: "options",
      message: "What do you want?",
      askAnswered: true,
      choices: [{
        name: 'Test',
        value: TESTD,
        checked: true
      }, {
        name: 'Debug',
        value: DEBUG,
        checked: false
      }, {
        name: 'Part 1',
        value: PART1,
        checked: true
      }, {
        name: 'Part 2',
        value: PART2,
        checked: true
      }]
    },
  ], answer);

function getDirectories(path) {
  return fs.readdirSync(path, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => +item.name);
}