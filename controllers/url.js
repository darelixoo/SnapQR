const QRCode = require("qrcode");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });

  try {
    // Generate QR code for the URL
    const qrCodeDataUrl = await QRCode.toDataURL(body.url);

    // Save the URL with the QR code
    const newUrlEntry = await URL.create({
      redirectURL: body.url,
      qrCode: qrCodeDataUrl,
      visitHistory: [],
      createdBy: req.user._id,
    });

    return res.render("home", {
      qrCode: qrCodeDataUrl, // Pass the QR code to the view
    });
  } catch (error) {
    console.error("Error creating QR code:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function handleGetAnalytics(req, res) {
  const result = await URL.findOne({ _id: req.params.id });
  if (!result) return res.status(404).json({ error: "URL not found" });

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
