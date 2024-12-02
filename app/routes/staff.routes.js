module.exports = (app) => {
    const staff = require("../controllers/staff.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Staff
    router.post("/", staff.create);
  
    // Retrieve all Staff
    router.get("/", staff.findAll);
  
    // Retrieve a single Staff with id
    router.get("/:id", staff.findOne);
  
    // Update a Staff with id
    router.put("/:id", staff.update);
  
    // Delete a Staff with id
    router.delete("/:id", staff.delete);
  
    // Delete all Staff
    router.delete("/", staff.deleteAll);
  
    app.use("/orm/staff", router);
  };