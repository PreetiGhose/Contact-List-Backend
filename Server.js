const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = process.eventNames.PORT || 3001;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/ContactListDB")
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

const ContactSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  email: String,
});

const Contact = mongoose.model("Contact", ContactSchema);

app.get("/", (req, res) => {
  console.log("hello");
  Contact.find({}, (err, foundContact) => {
    res.json({
      data: foundContact,
    });
  });
});

app.post("/", (req, res) => {
  console.log("backend");
  const newContact = req.body;
  console.log(req.body);
  const contact1 = new Contact({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
  });
  contact1.save();
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  console.log(req.body.id);
  Contact.findOneAndDelete({ _id: req.body.id }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted User : ", docs);
    }
    res.redirect("/");
  });
});

app.listen(PORT, () => {
  console.log("Server is listening at port 3001");
});
