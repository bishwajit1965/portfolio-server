// backend/config/firebaseAdmin.js
const admin = require("firebase-admin");

// Path to your Firebase service account key (downloaded from Firebase console)
const serviceAccount = require("../secret/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-database-url.firebaseio.com", // Replace with your Firebase DB URL
});

module.exports = admin;
