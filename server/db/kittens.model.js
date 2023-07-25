const mongoose = require("mongoose");

const { Schema } = mongoose;

const KittenSchema = new Schema({
  name: String,
  weight: Number,
  employee: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Kitten', KittenSchema);
