const pool = require('../config/db');
const ContactMessage = require('../models/contactMessage');

async function save(contactMessage) {
  const [result] = await pool.query(
    'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
    [contactMessage.name, contactMessage.email, contactMessage.message]
  );
  return result.insertId;
}

async function findAll() {
  const [rows] = await pool.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
  return rows.map((row) => new ContactMessage(row));
}

module.exports = { save, findAll };


