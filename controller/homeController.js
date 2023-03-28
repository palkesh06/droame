const Customer = require("../Models/Customer");
const Location = require("../Models/Location");
const ShotType = require("../Models/ShotType");
const Booking = require("../Models/Bookings");




exports.getHomePage = (req, res, next) => {
  res.send(
    '<nav> <center><a href="/add-customer"> Add Customer </a></center> <a href="/add-location"> <p align="right"> Add Location</p> </a> <a href="/add-shot-type"> <p align="right"> Add Dron Shot Type</p> </a><a href="/add-booking"> Add Booking </a> <br><a href="/get-customers"> View All Customers </a>'
  );
};





exports.addBooking = async (req, res, next) => {
  const cust = await Customer.findAll({ attributes: ["name"] });
  const loc = await Location.findAll({ attributes: ["name"] });
  const st = await ShotType.findAll({ attributes: ["name"] });
  res.render("add-booking", {
    pageTitle: "Add Booking",
    customer: cust,
    location: loc,
    shotType: st,
  });
};
exports.postBooking = async (req, res, next) => {
  const name = req.body.name;
  const location = req.body.location;
  const shotType = req.body.shotType;
  const location_id = await Location.findAll({
    where: { name: location },
    attributes: ["id"],
  });
  const shotType_id = await ShotType.findAll({
    where: { name: shotType },
    attributes: ["id"],
  });
  const customer_id = await Customer.findAll({
    where: { name: name },
    attributes: ["id"],
  });
  console.log(
    customer_id[0].dataValues.id,
    location_id[0].dataValues.id,
    shotType_id[0].dataValues.id
  );
  Booking.create({
    customer_name: name,
    locationId: location_id[0].dataValues.id,
    shotTypeId: shotType_id[0].dataValues.id,
    customerId: customer_id[0].dataValues.id,
  });
  res.redirect("/home");
};





exports.addCustomer = (req, res, next) => {
  res.render("add-customer", {
    pageTitle: "Add Customer",
  });
};
exports.postCustomer = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  //Post data to customer table.
  Customer.create({ name, email, phoneNumber })
    .then((result) => console.log("customer created!!"))
    .catch((err) => console.log(err));
  res.redirect("/home");
};
exports.getCustomers = async (req, res, next) => {
  const customers = await Customer.findAll();
  res.render("get-customers", {
    pageTitle: "Customers",
    Customers: customers,
  });
};
exports.editCustomer = async (req, res, next) => {
  const index = req.body.id;
  const data = await Customer.findByPk(index);
  const name = data.dataValues.name;
  const email = data.dataValues.email;
  const phoneNumber = data.dataValues.phoneNumber;
  res.render("edit-customer", {
    pageTitle: "Edit Customer",
    index: index,
    name: name,
    email: email,
    phoneNumber: phoneNumber,
  });
};
exports.updateCustomer = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  Customer.update(
    { name: name, email: email, phoneNumber: phoneNumber },
    { where: { id: req.body.index } }
  )
    .then((result) => res.redirect("/get-customers"))
    .catch((err) => console.log(err));
};




exports.addLocation = (req, res, next) => {
  res.render("add-location", {
    pageTitle: "Add Location",
  });
};
exports.postLocation = (req, res, next) => {
  const location = req.body.location;
  Location.create({ name: location });
  res.redirect("/home");
};




exports.addShotType = (req, res, next) => {
  res.render("add-shot-type", {
    pageTitle: "Add Shot-Type",
  });
};
exports.postShotType = (req, res, next) => {
  const shotType = req.body.shotType;
  ShotType.create({ name: shotType });
  res.redirect("/home");
};



exports.get404 = (req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found", path: "/404" });
};
