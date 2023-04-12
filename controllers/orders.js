const Order = require("../models/Order");
const User = require("../models/User");

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
  addFrenchfries: async (req, res) => {
    try {
      console.log("id" + req.params.id);
      await Order.findOneAndUpdate(
        { table: req.params.id , isClosed: false},
        {
          $push: { itemsOrdered: { name: "french fries", price: 5.0 } },
        }
      );
      console.log("Added french fries to items ordered");
      res.redirect("/dashboard/tables/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  addHamburger: async (req, res) => {
    try {
      console.log("id" + req.params.id);
      await Order.findOneAndUpdate(
        { table: req.params.id, isClosed: false },
        {
          $push: { itemsOrdered: { name: "hamburger", price: 5.0 } },
        }
      );
      console.log("Added hamburger to items ordered");
      res.redirect("/dashboard/tables/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  addPayment: async (req, res) => {
    try {
      const order = await Order.findOne({ table: req.params.id , isClosed: false});
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
  },
};
