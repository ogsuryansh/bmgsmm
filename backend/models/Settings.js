const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  smmApiUrl: { type: String, default: '' },
  smmApiKey: { type: String, default: '' },
  profitMargin: { type: Number, default: 20 }, // Percentage to add to original rate
});

module.exports = mongoose.model('Settings', SettingsSchema);
