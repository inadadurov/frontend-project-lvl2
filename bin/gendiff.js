#!/usr/bin/env node

import commander from '../node_modules/commander/index.js';

const program = new commander.Command();

program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format');

program.parse(process.argv);
