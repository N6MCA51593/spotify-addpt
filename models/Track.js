const mongoose = require('mongoose');
const TrackSchema = mongoose.Schema({
  spID: String,
  name: String,
  number: Number,
  discNumber: Number,
  isTracked: { type: Boolean, default: false },
  lastListen: { type: Date, default: null },
  listens: { type: Number, default: 0 }
});

module.exports = mongoose.model('track', TrackSchema);
