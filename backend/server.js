const express = require("express");
const path = require("path");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // To handle CORS issues

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'public'))); // Serve files from 'public' directory

// Initialize Mailgun client
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY, // Secure API key from .env
});

// Email sending API endpoint
app.post("/send-email", async (req, res) => {
  try {
    const { recipient, subject, message } = req.body;

    const response = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `Mailgun Test <${process.env.SENDER_EMAIL}>`,
      to: [process.env.RECIPIENT_EMAIL], // Send email to the provided recipient
      subject: subject,
      text: message,
    });

    res.json({ message: "Email sent successfully!", response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(3000, () => console.log("🚀 Server running on port 3000"));
