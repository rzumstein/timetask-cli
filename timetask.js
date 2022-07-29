#!/usr/bin/env node

import * as api from './api.js'
import inquirer from 'inquirer'
import yargs from 'yargs'

import ervy from 'ervy'
const { bar, bg } = ervy

async function add () {
  // const hours = (await inquirer.prompt([{
  //  message: 'Hours',
  //  name: 'hours',
  //  type: 'number'
  // }])).hours

  const clients = await api.getClients()
  const client = (await inquirer.prompt([{
    name: 'client',
    type: 'list',
    choices: clients.map(client => client.name),
    filter: (input) => clients.find(client => client.name === input)
  }]))
  console.log('client', client)
}

async function view () {
  const timeEntries = await api.getTime()
  console.log('timeEntries', timeEntries)
  const timeByDate = {}
  timeEntries.forEach(timeEntry => {
    if (timeByDate[timeEntry.date]) {
      timeByDate[timeEntry.date] += Number(timeEntry.time)
    } else {
      timeByDate[timeEntry.date] = Number(timeEntry.time)
    }
  })
  console.log('timeByDate', timeByDate)
  console.log('timeByDate entries', Object.entries(timeByDate))
  const chartData = Object.entries(timeByDate).map(tbd => ({
    key: tbd[0],
    value: tbd[1],
    style: bg('green')
  }))
  // const chartData = timeEntries.map(timeEntry => ({
  //   key: timeEntry.date,
  //   value: timeEntry.time,
  //   style: bg('red')
  // }))
  console.log(bar(chartData))
}

const argv = yargs(process.argv.slice(2))
  .usage('Usage: $0 <command> [options]')
  .command('add', 'add time to timetask', () => {}, add)
  .command('view', 'view time currently entered in timetask', () => {}, view)
  .example('$0 add', 'add time to timetask')
  .help('h')
  .alias('h', 'help')
  .strict(true)
  .demandCommand(1)
  .argv
