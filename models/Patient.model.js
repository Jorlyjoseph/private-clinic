const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  sex: String,
  address: String,
 
  diagnosisHistory: [
    {
      date: Date, 
      diagnosis: String 
    }
  ]
});



module.exports = mongoose.model('Patient', patientSchema);
