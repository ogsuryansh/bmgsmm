const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceId: { type: String, required: true },
  serviceName: { type: String },
  upstreamOrderId: { type: String }, // ID returned by the SMM provider
  link: { type: String, required: true },
  quantity: { type: Number, required: true },
  charge: { type: Number, required: true },
  status: { type: String, default: 'Pending' }, // Pending, Processing, In progress, Completed, Partial, Canceled
  startCount: { type: String, default: '' },
  remains: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);
