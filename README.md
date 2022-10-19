# ⚡ Lightning POS

Lightning POS is a restaurant point of sale application written in Node.js and EJS. Employees of restaurants can create and login to their accounts, access tables, create orders, and view them.

**Link to project:** https://important-cyan-flannel-shirt.cyclic.app/

![dashboard](https://raw.githubusercontent.com/andrewquach-dev/lightning-pos/main/assets/lightningpos-dashboard-screenshot.png?token=GHSAT0AAAAAABUFDWWTYBLSDYMJD427JPKCY2QSK7Q)


## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Node.js, EJS

**Package dependencies:** bcrypt, cloudinary, connect-mongo, dotenv, ejs, express, express-flash, express-session, method-override, mongodb, mongoose, morgan, multer, nodemon, passport, passport-local, validator, xmlhttprequest

## Optimizations

Add a "role" property to user object sessions so that only high-level roles (manager, co-manager, owner) can perform certain tasks (such as removing items from an order/table or adding menu items).

## Lessons Learned:

Working on this project helped to solidify my understanding of the MVC pattern and how projects can be divided into interchangable parts. For example, for this project, I'm using EJS for the "View," but because I followed the MVC pattern, I can easily switch to another UI handling library, such as React.

I also learned the significance of CRUD and how it can help me think about how to design an application that relies on user data.

## Installation

1. Clone repo
2. run `npm install`

## Usage

1. run `node server.js`
2. Navigate to `localhost:8080`

