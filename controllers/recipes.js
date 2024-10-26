// controllers/recipes.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');

// router logic will go here - will be built later on in the lab

//landing page
router.get("/", async (req, res) => {
    const recipes = await Recipe.find();
    res.render('recipes/index.ejs', {recipes});
})

//new page render
router.get("/new", async (req, res) => {
   res.render('recipes/new.ejs');
});

//add new recipes
router.post('/' , async ( req , res) =>{
    try{
    req.body.owner = req.session.user._id;
    await Recipe.create(req.body);
    res.redirect('/recipes')
    } catch(error){
      console.log(error)
      res.redirect('/');
    }    
});

//show page route
router.get('/:recipeId', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.recipeId);
        res.locals.recipe = recipe;
        res.render('recipes/show.ejs');

    } catch (error) {
        console.log(error);
        redirect('/')
    }
});

//edit
router.get('/:recipeId/edit', async (req , res) => {
    try {
        const recipe = await Recipe.findById(req.params.recipeId);
        const ingredients = await Ingredient.find();
        if (recipe.owner.equals(req.session.user._id)) {
            res.render('recipes/edit.ejs', {recipe, ingredients});            
        } else {
            res.send('You are not allowed to edit this recipe');
        }

    } catch (error) {
        console.log(error)
        res.redirect('/');
    }
});

//update
router.put('/:recipeId', async (req, res) => {
    try {
        const currentRecipe = await Recipe.findById(req.params.recipeId);
        if (currentRecipe.owner.equals(req.session.user._id)) {
            await currentRecipe.updateOne(req.body);
            res.redirect(`${req.params.recipeId}`);
        } else {
            res.send("You don't have permission to do that.");
        }
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

// delete 
router.delete('/:recipeId', async(req, res) => {
    try{
        const recipe = await Recipe.findById(req.params.recipeId);
        if(recipe.owner.equals(req.session.user._id)){
          await Recipe.findByIdAndDelete(req.params.recipeId);
          res.redirect("/recipes");
        }
        else {
          res.send("You are not allowed to delete this recipe")
        }
       
    } catch(error) {
        console.log(error)
        res.redirect('/')
    }
      
});

module.exports = router;