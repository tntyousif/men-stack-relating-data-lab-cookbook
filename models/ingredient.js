const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({

    name:{
        type: String,
        require: true,
    
    },
});

module.exports = mongoose.model('Ingredient', ingredientSchema);