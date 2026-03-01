// connexion BDD
const mongoose = require("mongoose");



// creation modele filters
const Filters = mongoose.model("Filters", {
  title: String,
  priceMin: Number,
  priceMax: Number,
  sort: String,
 page: {
    Number,
    true
 
  },
});

module.exports = Offer;


module.exports = Offer;
