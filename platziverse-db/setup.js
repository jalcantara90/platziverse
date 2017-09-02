'use strict'

const debug = require('debug')('platziverse:db:setup') // sirve para mostrar errores
const inquirer = require('inquirer') // sirve para pedirle parámetros al usuario y con estos parámetros decidir que ejecutar
const chalk = require('chalk') // para estilizar un poco los mensajes de consola
const db = require('./')

const prompt = inquirer.createPromptModule()

async function setup () {
  const answer = await prompt([
    {
      type: 'confirm',
      name: 'setup',
      message: 'This will destroy your database, are you sure?'
    }
  ])

  if (!answer.setup) {
    return console.log('Nothing Happened :)')
  }

  const config = {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'platzi',
    password: process.env.DB_PASS || 'platzi',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true
  }
  // ejecutamos de forma asíncrona la configuración de la base de datos si no hay errores mostrará success
  await db(config).catch(handleFatalError)

  console.log('Success!')
  process.exit(0)
}
// definimos función para ver si hay errores en la configuración de la base de datos
function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()
