const express = require("express");
const router = express.Router();
const tablesController = require("../controllers/tables");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Tables Routes - simplified for now
router.get("/", ensureAuth, tablesController.getTables);
router.get("/:id", ensureAuth, tablesController.getTable);
router.post("/createTable", tablesController.createTable);
module.exports = router;
