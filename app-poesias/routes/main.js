const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
    res.sendFile(path.resolve("./view/index.html"));
  });

  router.get("/header", (req, res) => {
    res.setHeader("Content-Type", "text/javascript"); 
    res.sendFile(path.resolve("./view/header.js"));
  });

  router.get("/main", (req, res) => {
    res.setHeader("Content-Type", "text/javascript"); 
    res.sendFile(path.resolve("./view/main.js"));
  });

  router.get("/footer", (req, res) => {
    res.setHeader("Content-Type", "text/javascript"); 
    res.sendFile(path.resolve("./view/footer.js"));
  });

module.exports = router;