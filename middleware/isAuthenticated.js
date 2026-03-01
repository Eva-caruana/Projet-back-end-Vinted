const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  try {
    console.log("Coucou");
    console.log("req.headers.authorization => ", req.headers.authorization);

    // Si on a pas envoyé de token => 401 Unauthorized
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    //extraire le token
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log("token => ", token);

    // On va chercher en DB si il y a bien un user dont le token correspond à ce qu'on m'a envoyé
    // User.findOne({token: ...})
    const user = await User.findOne({ token: token });

    if (!user) {
      // Si j'en trouve pas 401 Unauthorized
      return res.status(401).json({ message: "Unauthorized" });
    }

    // le req du middleware étant le même objet que le req du controller,
    // je peux passer des infos au controller comme suit
    req.user = user;
    // next permet de passer au middleware suivant
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//exporter fichier
module.exports = isAuthenticated;
