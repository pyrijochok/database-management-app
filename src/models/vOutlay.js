const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

// Define the schema
const vOutlaySchema = new mongoose.Schema({
    "Date": { type: Date, required: true},
    "Sum": { type: Number, required: true},
    "IdOut_type": { type: ObjectId, required: true},
},{ 
    collection: 'vOutlay',
    versionKey: false  
}); // Specify the collection name explicitly

// Create a model from the schema
const Outlay = mongoose.model('vOutlay', vOutlaySchema);

// Export the model
module.exports = Outlay;