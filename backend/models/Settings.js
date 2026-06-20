const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  smmApiUrl: { type: String, default: '' },
  smmApiKey: { type: String, default: '' },
});

module.exports = mongoose.model('Settings', SettingsSchema);
