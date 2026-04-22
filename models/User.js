// connexion BDD
const mongoose = require("mongoose");

// modele User
const User = mongoose.model("User", {
  email: {
    type: String,
    //unique: true,
  },
  account: {
    username: String,
    avatar: Object,
  },
  newsletter: Boolean,
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
