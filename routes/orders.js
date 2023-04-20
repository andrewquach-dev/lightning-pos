const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Orders Routes - simplified for now
router.get("/all", ensureAuth, ordersController.getOrders);
router.post("/createOrder/:id", ordersController.createOrder);
router.put("/addPayment/:id", ordersController.addPayment);
router.put("/closeOrder/:id", ordersController.closeOrder);

router.post('/addMenuItem/:id', ordersController.addMenuItem);



module.exports = router;
