#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../index.js';
import makeOutputString from '../src/makeoutput.js';
// const program = new commander.Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-v, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    const difference = genDiff(filepath1, filepath2);
    const output = makeOutputString(difference, options.format);
    console.log(output);
  });

program.parse();
