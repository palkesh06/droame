const Customer = require("../Models/Customer");
const Location = require("../Models/Location");
const ShotType = require("../Models/ShotType");
const Booking = require("../Models/Bookings");

exports.getHomePage = async (req, res, next) => {
  const bookings = await Booking.findAll();
  res.render("home-page", {
    booking: bookings,
  });
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
  Booking.create({
    customer_name: name,
    locationId: location_id[0].dataValues.id,
    shotTypeId: shotType_id[0].dataValues.id,
    customerId: customer_id[0].dataValues.id,
  });
  res.redirect("/home");
};
exports.editBooking = async (req, res, next) => {
  const edit_id = req.body.edit_id;
  const delete_id = req.body.delete_id;
  if (edit_id && delete_id === undefined) {
    const cust = await Customer.findAll({ attributes: ["name"] });
    const loc = await Location.findAll({ attributes: ["name"] });
    const st = await ShotType.findAll({ attributes: ["name"] });
    res.render("edit-booking", {
      pageTitle: "Edit Booking",
      id: edit_id,
      customer: cust,
      location: loc,
      shotType: st,
    });
  } else {
    Booking.destroy({ where: { booking_id: delete_id } })
      .then(() => res.redirect("/home"))
      .catch((err) => console.log(err));
  }
};
exports.updateBooking = async (req, res, next) => {
  const custId = await Customer.findAll(
    { where: { name: req.body.name } },
    { attributes: ["id"] }
  );
  const locId = await Location.findAll(
    { where: { name: req.body.location } },
    { attributes: ["id"] }
  );
  const shotId = await ShotType.findAll(
    { where: { name: req.body.shotType } },
    { attributes: ["id"] }
  );
  Booking.update(
    {
      customer_name: req.body.name,
      customerId: custId[0].dataValues.id,
      locationId: locId[0].dataValues.id,
      shotTypeId: shotId[0].dataValues.id,
    },
    { where: { booking_id: req.body.id } }
  )
    .then((result) => res.redirect("/home"))
    .catch((err) => console.log(err));
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
