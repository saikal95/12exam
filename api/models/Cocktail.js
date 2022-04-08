const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const IngredientSchema = new Schema({
  name: String,
  quantity: String,
})

const CocktailSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },

  image: String,
  recipe: String,
  published: Boolean,
  description: String,
  ingredient: [ IngredientSchema ]
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

module.exports = Cocktail;
