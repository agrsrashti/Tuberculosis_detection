const mongoose = require("mongoose");

let TBSchema = new mongoose.Schema({
  image: String,
  type: String,
  doctorRequested: Boolean,
  doctorDiagnosis: {
    confidence: Number,
    condition: String,
  },
  aiDiagnosis: {
    confidence: Number,
    condition: String,
  },
  date: { type: Date, default: Date.now },
});

TBSchema.set("toJSON", { virtuals: true });

const TBRef = mongoose.model("TBRef", TBSchema, "TBRef");

module.exports = { TBRef };
