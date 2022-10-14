const express = require("express");
const router = express.Router();
const tablesController = require("../controllers/tables");
const dashboardController = require("../controllers/dashboard");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Dashboard Routes - simplified for now
router.get("/", ensureAuth, dashboardController.getDashboard);
router.get("/tables", ensureAuth, tablesController.getTables);

module.exports = router;
