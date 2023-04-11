const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const menuItemsController = require("../controllers/menuitems");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Menu Item Routes
router.put("/:id", menuItemsController.updateMenuItem);

router.post("/createMenuItem", upload.single("file"), menuItemsController.createMenuItem);

router.put("/editMenuItem/:id", menuItemsController.editMenuItem);

router.delete("/deleteMenuItem/:id", menuItemsController.deleteMenuItem);

module.exports = router;
