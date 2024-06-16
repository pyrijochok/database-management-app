const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

// Define the schema
const vServiceSchema = new mongoose.Schema({
    "Payment_Date": { type: Date, required: true},
    "Expiration_Date": { type: Date, required: true},
    "Sum": { type: Number, required: true},
    "IdTourist": { type: ObjectId, required: true},
    "IdService_type": { type: ObjectId, required: true},
},{ 
    collection: 'vService',
    versionKey: false  
}); // Specify the collection name explicitly

// Create a model from the schema
const Service = mongoose.model('vService', vServiceSchema);

// Export the model
module.exports = Service;