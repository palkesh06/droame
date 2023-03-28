const express = require("express");
const bodyParser = require("body-parser");

const Controller = require("../droame/controller/homeController");

const sequelize = require("./util/database");

const Booking = require('../droame/Models/Bookings');
const Customer = require('../droame/Models/Customer');
const Location = require('../droame/Models/Location');
const ShotType = require('../droame/Models/ShotType');

const app = express();

//To render html data using ejs engine.
app.set("view engine", "ejs");
app.set("views", "views");

// middleware to parse the body of the request.
app.use(bodyParser.urlencoded({ extended: false }));
// Home page ..
app.use("/home", Controller.getHomePage);

// To handle booking related operations.
app.get('/add-booking', Controller.addBooking); 
app.post('/add-booking', Controller.postBooking);
app.post('/edit-booking',Controller.editBooking);
app.post('/update-booking',Controller.updateBooking);

// To handle location realated operations.
app.get("/add-location", Controller.addLocation);
app.post("/add-location", Controller.postLocation);

// To handle add shot type related operations.
app.get("/add-shot-type", Controller.addShotType);
app.post("/add-shot-type", Controller.postShotType);

// To handle customer related operations.
app.get("/add-customer", Controller.addCustomer);
app.post("/add-customer", Controller.postCustomer);
app.get('/get-customers', Controller.getCustomers);
app.use('/edit-customer/', Controller.editCustomer);
app.post('/update-customer/', Controller.updateCustomer);

// To handle 404 page.
app.use(Controller.get404);

Booking.belongsTo(Customer,{ constraints: true, onDelete: 'CASCADE' });
Customer.hasMany(Booking);
Location.hasMany(Booking);
ShotType.hasMany(Booking);

sequelize
  .sync()
  .then((data) => {
    app.listen(8000, () => {
      console.log("Server Started..");
    });
  })
  .catch((err) => console.log(err));
