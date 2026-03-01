// Permet d'activer les variables d'environnement qui se trouvent dans le fichier `.env`
require("dotenv").config();

//Importations packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//ajout middleware
const isAuthenticated = require("./middleware/isAuthenticated");

// import de cloudinary
const cloudinary = require("cloudinary").v2;

// Connexion à mon compte cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//Declarer express
const app = express();
//connecter middleware pour faire apparaitre le body
app.use(express.json());

// securité
app.use(cors());

//connecter la BDD mongoose
mongoose.connect(process.env.MONGODB_URI);

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
