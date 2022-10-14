const Table = require("../models/Table");
const Order = require("../models/Order");

module.exports = {
  getTables: async (req, res) => {
    try {
      const tables = await Table.find().sort({ name: "1" }).lean();
      res.render("tables.ejs", { tables: tables });
    } catch (err) {
      console.log(err);
    }
  },
  createTable: async (req, res) => {
    try {
      await Table.create({
        name: req.body.title,
        user: req.user.id,
        peopleCount: 0,
      });
      console.log(`Table ${req.body.title} has been added!`);
      res.redirect("/dashboard/tables");
    } catch (err) {
      console.log(err);
    }
  },

  getTable: async (req, res) => {
    try {
      const table = await Table.findById(req.params.id);
      const order = await Order.find({
        table: req.params.id,
        isClosed: "false",
      }).lean();
      console.log(order[0]);
      res.render("table.ejs", { table: table, order: order });
    } catch (err) {
      console.log(err);
    }
  },
};
