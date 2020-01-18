const mongoose = require('mongoose');
const timestampPlugin = require('./plugins/timestamp');

const AssetSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  plateNumber: {
    type: String,
    required: true,
    unique: true
  },
  color: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Active'],
    default: 'Pending'
  }
});

AssetSchema.plugin(timestampPlugin);

module.exports = mongoose.model('asset', AssetSchema);
