const mongoose = require('mongoose');
const timestampPlugin = require('./plugins/timestamp');

const PoolSchema = mongoose.Schema({
  asset: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'asset',
    required: true
  },
  departLocation: {
    type: String,
    required: true
  },
  arriveLocation: {
    type: String,
    required: true
  },
  departureTime: {
    type: Date,
    required: true
  },
  fee: {
    type: String,
    required: true
  },
  availableSeats: {
    type: Number,
    required: true
  }
});

PoolSchema.plugin(timestampPlugin);

module.exports = mongoose.model('asset', PoolSchema);
