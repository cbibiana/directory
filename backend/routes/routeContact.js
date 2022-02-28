import express from "express";
import controllerContact from "../controllers/controllerContact.js";
import middContact from "../middleware/middContact.js";

const router = express.Router();

router.post(
  "/addContact",
  middContact.validData,
  middContact.existingContact,
  middContact.fullDirectory,
  controllerContact.addContact
);
router.get("/listContact", controllerContact.listContact);
router.get("/searchContact/:name?", controllerContact.searchContact);
router.delete("/deleteContact/:_id", controllerContact.deleteContact);

export default router;
