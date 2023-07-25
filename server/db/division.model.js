// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const DivisionSchema = new Schema({
  name: String,
  boss: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
  },
  budget: Number,
  location: {
    city: String,
    country: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Division", DivisionSchema);
