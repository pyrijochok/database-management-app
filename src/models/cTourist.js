// Import Mongoose
const mongoose = require('mongoose');

// Define the schema
const cTouristSchema = new mongoose.Schema({
    "Full_Name": { type: String, required: true },
    "Birth_Date": { type: Date, required: true},
    "Passport_Number": { type: String, required: true, unique: true },
},{ 
    collection: 'cTourist',
    versionKey: false  
}); // Specify the collection name explicitly

// Create a model from the schema
const Tourist = mongoose.model('cTourist', cTouristSchema);

// Export the model
module.exports = Tourist;