const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    redirectURL: {
      type: String,
      required: true,
    },
    qrCode: {
      type: String, // Store the QR code data as a string (data URL)
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
