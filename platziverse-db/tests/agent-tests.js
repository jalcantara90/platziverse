'use strict'

const test = require('ava')

let config = {
  logging: function () {}
}
let db = null

test.beforeEach(async () => {
  const setupDatabase = require('../')
  db = await setupDatabase(config)
})

// test de prueba para ver que ava está configurado y funcionando
// test('make it pass', t => {
//   t.pass()
// })

test('Agent', t => {
  t.truthy(db.Agent, 'AgentSercive should exists!')
})
