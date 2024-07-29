const pool = require('./pool')

async function logAll() {
  const { rows } = await pool.query('SELECT * FROM messages')
  console.log(rows)
}

module.exports = { logAll }