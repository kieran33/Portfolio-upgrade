const contactService = require('../services/contactService');

async function submitContact(req, res) {
  try {
    const id = await contactService.submitContactMessage(req.body);
    res.status(201).json({ success: true, id });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

module.exports = { submitContact };