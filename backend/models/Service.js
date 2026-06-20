const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  serviceId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String },
  category: { type: String, required: true },
  rate: { type: Number, required: true }, // Original cost from provider
  sellPrice: { type: Number, required: true }, // Cost shown to our users (with profit margin)
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  dripfeed: { type: Boolean, default: false },
  refill: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Service', ServiceSchema);
