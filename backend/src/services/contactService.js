const contactRepository = require('../repositories/contactRepository');
const ContactMessage = require('../models/contactMessage');

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function submitContactMessage({ name, email, message }) {
  if (!name || !name.trim()) {
    throw new Error('Le nom est obligatoire.');
  }
  if (!email || !isValidEmail(email)) {
    throw new Error('Email invalide.');
  }
  if (!message || !message.trim()) {
    throw new Error('Le message est obligatoire.');
  }

  const contactMessage = new ContactMessage({ name, email, message });
  const id = await contactRepository.save(contactMessage);
  return id;
}

module.exports = { submitContactMessage };



