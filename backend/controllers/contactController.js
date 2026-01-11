import Contact from '../models/Contact.js';

// Get all contacts
const getContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const total = await Contact.count();
    const contacts = await Contact.findAll({ limit, offset });

    if (contacts.length === 0) {
      return res.json({ message: 'No messages found' });
    }

    const totalPages = Math.ceil(total / limit);

    res.json({
      data: contacts,
      total,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single contact
const getContact = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create contact
const createContact = async (req, res) => {
  try {
    const newContact = await Contact.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message,
    });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update contact
const updateContact = async (req, res) => {
  try {
    const updateData = {};
    if (req.body.name !== undefined) updateData.name = req.body.name;
    if (req.body.email !== undefined) updateData.email = req.body.email;
    if (req.body.phone !== undefined) updateData.phone = req.body.phone;
    if (req.body.message !== undefined) updateData.message = req.body.message;

    await Contact.update(updateData, { where: { id: req.params.id } });
    const updatedContact = await Contact.findByPk(req.params.id);

    if (!updatedContact) return res.status(404).json({ message: 'Contact not found' });

    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete contact
const deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Contact not found' });

    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
