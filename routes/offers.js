//Importations packages
const express = require("express");
// import de fileupload, package qui permet via un middleware de rendre les formdata lisibles à nos routes
const fileUpload = require("express-fileupload");
// Import de la fonction utilitaire qui permet de transformer les Buffers en string
const convertToBase64 = require("../utils/convertToBase64");

const isAuthenticated = require("../middleware/isAuthenticated");

// import de cloudinary
const cloudinary = require("cloudinary").v2;

// importation fichiers
const User = require("../models/User");
const Offers = require("../models/Offers");

//declarer express
const router = express.Router();

//Post an offer
router.post(
  "/offer/publish",
  isAuthenticated,
  fileUpload(),
  async (req, res) => {
    try {
      // Les clefs textuelles du formData sont dans req.body
      console.log("body => ", req.body);
      // Les clefs fichiers du formData sont dans req.files
      console.log("files => ", req.files);

      // Transforme mon image de Buffer à String
      const base64Image = convertToBase64(req.files.Image);

      // Je fais une requête à cloudianry pour qu'il héberge mon image
      const cloudinaryResponse = await cloudinary.uploader.upload(base64Image);

      console.log("cloudinaryResponse => ", cloudinaryResponse);

      const newOffer = new Offers({
        product_name: req.body.title,
        product_description: req.body.description,
        product_price: req.body.price,
        product_details: [
          { product_condition: req.body.condition },
          { product_city: req.body.city },
          { product_brand: req.body.brand },
          { product_size: req.body.size },
          { product_color: req.body.color },
        ],
        //product_image: cloudinaryResponse,

        owner: req.user._id,
      });
      console.log("newOffer => ", newOffer);
      await newOffer.save();
      await newOffer.populate("owner", "account email");

      res.status(201).json(newOffer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

// route en Get OFFERS

router.get("/offers", async (req, res) => {
  try {
    console.log("req.query => ", req.query);

    // const filters = {
    //   product_name: new RegExp(req.query.title, "i"),
    //   product_price: {
    //     $gte: req.query.priceMin,
    //   },
    // };

    const filters = {};
    // filtres title
    if (req.query.title) {
      filters.product_name = new RegExp(req.query.title, "i");
    }

    //filtres priceMin /priceMax
    // on fait ça avant sinon les if seuls ecrasent la deucieme valeur si la premiere sactive.
    if (req.query.priceMin) {
      filters.product_price = {
        $gte: Number(req.query.priceMin),
      };
    }
    //si price min on ajoute filters lte à product price
    // console.log("test filters => ", filters);

    if (req.query.priceMax) {
      if (filters.product_price) {
        filters.product_price.$lte = Number(req.query.priceMax);
      } else {
        //si price max on ajoute filters gte à product price
        filters.product_price = {
          $lte: Number(req.query.priceMax),
        };
      }
    }

    console.log("final filters => ", filters);

    const sortFilters = {};
    //tri
    // si mon sort est croissant price =1 si mon sort est decroissant price=-1
    if (req.query.sort === "price-desc") {
      sortFilters.product_price = "descending";
    } else if (req.query.sort === "price-asc") {
      sortFilters.product_price = "ascending";
    }

    console.log("sortFilter => ", sortFilters);
    // //pagination
    const limitFilter = 2;

    let pageFilter = 1;

    if (req.query.page) {
      pageFilter = req.query.page;
    }

    // 5 résultats par page : page 1 => 0, page 2 => 5, page 3 => 10, page 4 => 15
    // 3 résultats par page : page 1 => 0, page 2 => 3, page 3 => 6, page 4 => 9

    // (numéro de page - 1) * nb de résultat par page

    //Revoir calcul SKIP

    //renvoyer aussi total des offres
    const skipFilter = (pageFilter - 1) * limitFilter;

    const offers = await Offer.find(filters)
      .sort(sortFilters)
      .skip(skipFilter)
      .limit(limitFilter)
      .populate("owner", "account");
    // .select("product_name product_price");

    const count = await Offer.countDocuments(filters);
    console.log("count => ", count);

    res.json({
      count: count,
      offers: offers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/offers/:id", async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id).populate(
      "owner",
      "account",
    );
    res.json(offer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//exporter fichier
module.exports = router;
