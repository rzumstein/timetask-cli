#!/usr/bin/env node

import axios from 'axios'
import inquirer from 'inquirer'
import yargs from 'yargs'

const apiKey = '2n9ui42er2x'

async function add() {
  const hours = (await inquirer.prompt([{
    message: 'Hours',
    name: 'hours',
    type: 'number'
  }])).hours
}

const argv = yargs(process.argv.slice(2))
  .usage('Usage: $0 <command> [options]')
  .command('add', 'add time to timetask', () => {}, add)
  .example('$0 add', 'add time to timetask')
  .help('h')
  .alias('h', 'help')
  .strict(true)
  .demandCommand(1)
  .argv
