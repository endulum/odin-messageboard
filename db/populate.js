#! /usr/bin/env node
require('dotenv').config()
const { Client } = require('pg')

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255) NOT NULL,
  message VARCHAR(255) NOT NULL,
  date TIMESTAMP NOT NULL
);

INSERT INTO messages (username, message, date) VALUES
  ('Amando', 'Hi there!', TO_TIMESTAMP(${Date.now()})),
  ('Charles', 'Hello world!', TO_TIMESTAMP(${Date.now()}))
;
`

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.CONNECTION
  });
  await client.connect();

  // does table already exist?
  const { rows } = await client.query(`
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'messages'
    ) AS exists;
  `)
  if (rows[0].exists) await client.query('DROP TABLE messages')
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main()