const Table = require("../models/Table");
const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");


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
      const menuItems = await MenuItem.find().sort({ name: "1" }).lean();

      res.render("table.ejs", { table: table, order: order, menuItems: menuItems });
    } catch (err) {
      console.log(err);
    }
  },
};
