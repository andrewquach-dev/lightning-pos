const cloudinary = require("../middleware/cloudinary");
const MenuItem = require("../models/MenuItem");

module.exports = {
    updateMenuItem: async (req, res) => {
        try {
            const menuItems = await MenuItem.find().lean();
            res.render("menu.ejs", { menuItems: menuItems });
        } catch (err) {
            console.log(err);
        }
    },
    getMenuItem: async (req, res) => {
        try {
            const menuItem = await MenuItem.findById(req.params.id);
            res.render("menuItem.ejs", { menuItem: menuItem });
        } catch (err) {
            console.log(err);
        }
    },
    createMenuItem: async (req, res) => {
        try {
            // Upload image to cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);

            await MenuItem.create({
                name: req.body.name,
                price: req.body.price,
                image: result.secure_url,
                cloudinaryId: result.public_id,
            });

            console.log("Menu Item has been added!");
            const util = require('util');

            console.log("HERE" + util.inspect(req.params));
            res.redirect("/dashboard/");
        } catch (err) {
            console.log(err);
        }
    },
    editMenuItem: async (req, res) => {
        try {
            // Find menu item by id
            let menuItem = await MenuItem.findById(req.params.id);
            // Update image on cloudinary
            if (req.file) {
                await cloudinary.uploader.destroy(menuItem.cloudinaryId);
                const result = await cloudinary.uploader.upload(req.file.path);
                menuItem.image = result.secure_url;
                menuItem.cloudinaryId = result.public_id;
            }
            menuItem.name = req.body.name;
            menuItem.description = req.body.description;
            menuItem.price = req.body.price;
            await menuItem.save();
            console.log("Menu Item has been updated!");
            res.redirect("/menu");
        } catch (err) {
            console.log(err);
        }
    },
    deleteMenuItem: async (req, res) => {
        try {
            // Find menu item by id
            let menuItem = await MenuItem.findById(req.params.id);
            // Delete image from cloudinary
            await cloudinary.uploader.destroy(menuItem.cloudinaryId);
            // Delete menu item from db
            await MenuItem.remove({ _id: req.params.id });
            console.log("Deleted Menu Item");
            res.redirect("/menu");
        } catch (err) {
            console.log(err);
        }
    },
};
