import Contact from "../models/contact.js";

//Función para adicionar contacto
const addContact = async (req, res) => {
  const shema = new Contact({
    name: req.body.name,
    telephone: req.body.telephone,
    cellphone: req.body.cellphone,
  });

  const result = await shema.save();
  return result
    ? res.status(201).send({ message: "contact saved" })
    : res.status(500).send({ message: "failed to register contact" });
};

//Función para listar contacto
const listContact = async (req, res) => {
  const contacts = await Contact.find();
  return contacts.length > 0
    ? res.status(200).send({ contacts })
    : res.status(404).send({ message: "No contact in contact book" });
};

//Función para buscar contactos
const searchContact = async (req, res) => {
  const contacts = await Contact.findOne(
    {
      name: new RegExp(req.params["name"]),
    },
    { telephone: 1, _id: 0 }
  );
  return contacts
    ? res.status(200).send({ contacts })
    : res.status(404).send({ message: "No contact found " });
};

//Función para eliminar contacto
const deleteContact = async (req, res) => {
  const contact = await Contact.findByIdAndDelete({ _id: req.params["_id"] });
  return contact
    ? res.status(200).send({ message: "Contact deleted" })
    : res.status(400).send({ message: "No contact deleted" });
};

//Función para modificar contacto
const updateContact = async (req, res) => {
  const result = await Contact.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    telephone: req.body.telephone,
    cellphone: req.body.cellphone,
  });

  return result
    ? res.status(200).send({ message: "Successfully updated contact" })
    : res.status(500).send({ message: "Failed to update contact" });
};

//Función para verficar si el directorio esta lleno
const directoryFull = async (req, res) => {
  const capacity = await Contact.find();
  if (capacity.length >= 10) {
    return res.status(200).send({ message: "The directory is full" });
  } else {
    return res
      .status(200)
      .send({ message: `You can add ${10 - capacity.length} Contacts` });
  }
};

export default {
  addContact,
  listContact,
  searchContact,
  deleteContact,
  updateContact,
  directoryFull,
};
