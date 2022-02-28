import Contact from "../models/contact.js";

const validData = async (req, res, next) => {
  if (!req.body.name)
    return res.status(400).send({ message: "No name entered" });
  if (!req.body.telephone || !req.body.cellphone)
    return res.status(400).send({ message: "No number was entered" });
  next();
};

const existingContact = async (req, res, next) => {
  const contactExisting = await Contact.findOne({ name: req.body.name });
  if (contactExisting) 
  return res.status(400).send({ message: "Contact already exists" });
  next();
};

const capacityDirectory = async (req, res, next)=>{
    const capacityFull = await Contact.find();
    if(capacityFull.length >= 10) 
    return res.status(400).send({message:"Directory is full"});
    next();
}

export default { validData, existingContact, capacityDirectory };
