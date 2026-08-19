jest.mock('../repositories/contactRepository');
const contactRepository = require('../repositories/contactRepository');
const { submitContactMessage } = require('../services/contactService');

describe('contactService.submitContactMessage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('rejette un nom vide', async () => {
    await expect(
      submitContactMessage({ name: '', email: 'test@test.com', message: 'Salut' })
    ).rejects.toThrow('Le nom est obligatoire.');
  });

  test('rejette un email vide', async () => {
    await expect(
      submitContactMessage({ name: 'Kiéran', email: '', message: 'Salut' })
    ).rejects.toThrow('Email invalide.');
  });

  test('rejette un email invalide', async () => {
    await expect(
      submitContactMessage({ name: 'Kiéran', email: 'pasunmail', message: 'Salut' })
    ).rejects.toThrow('Email invalide.');
  });

  test('rejette un message vide', async () => {
    await expect(
      submitContactMessage({ name: 'Kiéran', email: 'test@test.com', message: '' })
    ).rejects.toThrow('Le message est obligatoire.');
  });

  test('enregistre un message valide', async () => {
    contactRepository.save.mockResolvedValue(42);
    const id = await submitContactMessage({ name: 'Kiéran', email: 'test@test.com', message: 'Salut' });
    expect(id).toBe(42);
    expect(contactRepository.save).toHaveBeenCalledTimes(1);
  });
});



