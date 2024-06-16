// Import Mongoose
const mongoose = require('mongoose');

// Define the schema
const cOutTypeSchema = new mongoose.Schema({
    "Name": { type: String, required: true, unique:true }
},{ 
    collection: 'cOut_type',
    versionKey: false  
});

// Create a model from the schema
const OutType = mongoose.model('cOut_type', cOutTypeSchema);

// Export the model
module.exports = OutType;