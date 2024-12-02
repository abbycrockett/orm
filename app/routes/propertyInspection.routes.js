module.exports = (app) => {
  const propertyInspections = require("../controllers/propertyInspection.controller.js");

  var router = require("express").Router();

  // Create a new PropertyInspection
  router.post("/", propertyInspections.create);

  // Retrieve all PropertyInspections
  router.get("/", propertyInspections.findAll);

  // Retrieve all PropertyInspections for a single property
  router.get("/property/:propertyNo", propertyInspections.findAllForProperty);

  // Retrieve a single PropertyInspection with propertyNo and iDate
  router.get("/:propertyNo/:iDate", propertyInspections.findOne);

  // Update a PropertyInspection with propertyNo and iDate
  router.put("/:propertyNo/:iDate", propertyInspections.update);

  // Delete a PropertyInspection with propertyNo and iDate
  router.delete("/:propertyNo/:iDate", propertyInspections.delete);

  // Delete all PropertyInspections
  router.delete("/", propertyInspections.deleteAll);

  app.use("/orm/propertyInspections", router);
};