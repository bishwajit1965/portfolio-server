const admin = require("firebase-admin");
// const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_PRIVATE_KEY);
// Parse the private key properly by replacing escaped newlines with actual newlines
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n");
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: privateKey,
  }),
  databaseURL: "https://<your-database-name>.firebaseio.com",
});

module.exports = admin;
