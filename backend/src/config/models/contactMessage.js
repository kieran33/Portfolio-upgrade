class ContactMessage {
  constructor({ id = null, name, email, message, created_at = null }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.message = message;
    this.created_at = created_at;
  }
}

module.exports = ContactMessage;