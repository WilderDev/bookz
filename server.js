// Import Express Package
const express = require("express");

// Initialize Express
const app = express();

// Serve static build files from the "dist" directory
app.use(express.static("./dist/bookz"));

// Route incoming server requests to the correct files
app.get("/*", (_, res) => res.sendFile("index.html", { root: "dist/bookz" }));

// Start our app on the default Heroku Port
app.listen(process.env.PORT || 8080);
