import mongoose from "mongoose";

const contactShema = new mongoose.Schema({
  name: String,
  telephone: Number,
  cellphone: Number,
});

const contact = mongoose.model("contacts", contactShema);

export default contact;