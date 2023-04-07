const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const menuItemsController = require("../controllers/menuItems");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Menu Item Routes
router.get("/:id", ensureAuth, menuItemsController.getMenuItem);

router.post("/createMenuItem", upload.single("file"), menuItemsController.createMenuItem);

router.put("/updateMenuItem/:id", menuItemsController.updateMenuItem);

router.delete("/deleteMenuItem/:id", menuItemsController.deleteMenuItem);

module.exports = router;
