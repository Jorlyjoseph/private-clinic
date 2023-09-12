const { Schema, model } = require('mongoose');

const patientSchema = new Schema(
  {
    name: String,
    age: Number,
    sex: String,
    address: String
  },
  {
    timestamps: true
  }
);

const Patient = model('Patient', patientSchema);

module.exports = Patient;
