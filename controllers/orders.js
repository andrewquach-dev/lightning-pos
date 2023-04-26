const Order = require("../models/Order");
const User = require("../models/User");
const MenuItem = require("../models/MenuItem");

module.exports = {
  createOrder: async (req, res) => {
    try {
      console.log("REQ" + req.params);
      console.log(res);
      const orderUser = await User.findById(req.user.id);
      await Order.create({
        peopleCount: req.body.title,
        table: req.params.id,
        createdBy: orderUser.email,
        createdById: req.user.id,
      });
      console.log("Order has been created!");
      res.redirect("/dashboard/tables/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  addMenuItem: async (req, res) => {
    try {
      const order = await Order.findOne({ table: req.params.id, isClosed: false });
      const menuItemId = req.body.menuItemId;
      const menuItem = await MenuItem.findById(menuItemId);

      if (!menuItem) {
        return res.status(404).send("Menu item not found");
      }

      const existingItem = order.itemsOrdered.find((item) => item.menuItem == menuItemId);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
        order.markModified('itemsOrdered'); // Add this line to inform Mongoose about the changes
      } else {
        order.itemsOrdered.push({
          menuItem: menuItemId,
          name: menuItem.name,
          price: menuItem.price,
          quantity: 1,
          totalPrice: menuItem.price,
        });
      }

      const total = order.itemsOrdered.reduce((total, item) => total + item.totalPrice, 0);
      if (!isNaN(total)) {
        order.total = total;
      } else {
        order.total = 0;
      }

      order.amountOwed = order.total - order.paymentAmount;

      await order.save();

      console.log("Updated order with new item: ", menuItem.name);
      res.redirect("/dashboard/tables/" + req.params.id);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error updating order: " + err.message);
    }
  },

  addPayment: async (req, res) => {
    try {
      const order = await Order.findOne({ table: req.params.id, isClosed: false });
      let total =
        +parseFloat(order.itemsOrdered.reduce((a, e) => (a += e.price), 0)) +
        +parseFloat(
          (
            order.itemsOrdered.reduce((a, e) => (a += e.price), 0) * 0.0525
          ).toFixed(2)
        );
      console.log(req.body);
      await Order.findOneAndUpdate(
        { table: req.params.id, isClosed: false },
        {
          $set: {
            paymentAmount: +req.body.paymentAmount,
            total: total,
            amountOwed: +total - +req.body.paymentAmount,
          },
        }
      );
      console.log("Added payment details to order");
      res.redirect("/dashboard/tables/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  closeOrder: async (req, res) => {
    try {
      await Order.findOneAndUpdate(
        { table: req.params.id, isClosed: false },
        {
          $set: {
            isClosed: true,
          },
        }
      );
      console.log("Closed order");
      res.redirect("/dashboard/tables/");
    } catch (err) {
      console.log(err);
    }
  },
  getOrders: async (req, res) => {
    try {
      const orders = await Order.find({ isClosed: true })
        .sort({ name: "1" })
        .lean();
      console.log(orders)
      res.render("orders.ejs", { orders: orders });
    } catch (err) {
      console.log(err);
    }
  }, incrementMenuItem: async (req, res) => {
    try {
      const order = await Order.findOne({ table: req.params.id, isClosed: false });
      const menuItemId = req.params.menuItemId;
      const existingItem = order.itemsOrdered.find((item) => item.menuItem.toString() === menuItemId.toString());

      if (!existingItem) {
        const menuItem = await MenuItem.findById(menuItemId);
        if (!menuItem) {
          return res.status(404).send("Menu item not found");
        }
        order.itemsOrdered.push({
          menuItem: menuItemId,
          name: menuItem.name,
          price: menuItem.price,
          quantity: 1,
          totalPrice: menuItem.price,
        });
      } else {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      }

      order.markModified("itemsOrdered");
      const total = order.itemsOrdered.reduce((total, item) => total + item.totalPrice, 0);
      if (!isNaN(total)) {
        order.total = total;
      } else {
        order.total = 0;
      }
      order.amountOwed = order.total - order.paymentAmount;
      await order.save();

      console.log("Incremented quantity of order item: ", existingItem.name);
      res.redirect("/dashboard/tables/" + req.params.id);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error updating order: " + err.message);
    }
  },

  decrementMenuItem: async (req, res) => {
    try {
      const order = await Order.findOne({ table: req.params.id, isClosed: false });
      const menuItemId = req.params.menuItemId;
      const existingItem = order.itemsOrdered.find((item) => item.menuItem.toString() === menuItemId.toString());

      if (!existingItem) {
        return res.status(404).send("Menu item not found in order");
      }

      if (existingItem.quantity === 1) {
        // Remove item if quantity is 1
        order.itemsOrdered = order.itemsOrdered.filter((item) => item.menuItem.toString() !== menuItemId.toString());
      } else {
        // Decrement quantity by 1 and update total price
        existingItem.quantity -= 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      }

      order.markModified("itemsOrdered");
      const total = order.itemsOrdered.reduce((total, item) => total + item.totalPrice, 0);
      if (!isNaN(total)) {
        order.total = total;
      } else {
        order.total = 0;
      }
      order.amountOwed = order.total - order.paymentAmount;
      await order.save();

      console.log("Decremented quantity of order item: ", existingItem.name);
      res.redirect("/dashboard/tables/" + req.params.id);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error updating order: " + err.message);
    }
  }





};
