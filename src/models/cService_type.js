// Import Mongoose
const mongoose = require('mongoose');

// Define the schema
const cServiceTypeSchema = new mongoose.Schema({
    "Name": { type: String, required: true, unique:true }
},{ 
    collection: 'cService_type',
    versionKey: false  
});

// Create a model from the schema
const ServiceType = mongoose.model('cService_type', cServiceTypeSchema);

// Export the model
module.exports = ServiceType;