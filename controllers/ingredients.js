// controllers/ingredients.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Ingredient = require('../models/ingredient.js');

// router logic will go here - will be built later on in the lab

// GET /ingredients
router.get('/', async (req, res) => {
    try {
      const ingredients = await Ingredient.find();
      res.render('ingredients/index.ejs', { ingredients });
    } catch (error) {
      console.error(error);
      res.redirect('/');
    }
});
  
// POST /ingredients
router.post('/', async (req, res) => {
    try {
      const existingIngredient = await Ingredient.findOne({ name: req.body.name });
      if (!existingIngredient) {
        const newIngredient = new Ingredient(req.body);
        await newIngredient.save();
      }
      res.redirect('/ingredients');
    } catch (error) {
      console.error(error);
      res.redirect('/');
    }
});


module.exports = router;