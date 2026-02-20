// Permet d'activer les variables d'environnement qui se trouvent dans le fichier `.env`
require("dotenv").config();

//Importations packages
const express = require("express");
const mongoose = require("mongoose");

// cors
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

//ajout middleware
const isAuthenticated = require("./middleware/isAuthenticated");

// import de cloudinary
const cloudinary = require("cloudinary").v2;

// Connexion à mon compte cloudinary
cloudinary.config({
  cloud_name: "dyg3vgdgi",
  api_key: "192767226297699",
  api_secret: "zsnz5ve-Lsu7rB9wtXpUTTCn4c0",
});

//Declarer express
const app = express();
//connecter middleware pour faire apparaitre le body
app.use(express.json());

//connecter la BDD mongoose
mongoose.connect("process.env.MONGODB_URI");

//importations routes
const userRoutes = require("./routes/user");

//se co aux routes
app.use(userRoutes);

const offerRoutes = require("./routes/offers");
app.use(offerRoutes);

// S'il y a un pb de routes
app.all(/.*/, (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

//ecoute serveur
app.listen(process.env.PORT, () => {
  console.log("Server started");
});
