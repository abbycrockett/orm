const db = require("../models");
const Staff = db.staff;

console.log("Staff Model: ", Staff);

exports.create = (req, res) => {
  if (!req.body.sName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const staff = {
    staffNo: req.body.staffNo,
    sName: req.body.sName,
  };

  Staff.create(staff)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Staff.",
      });
    });
};

// Retrieve all Staff from the database.
exports.findAll = (req, res) => {
  Staff.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving staff.",
      });
    });
};

// Find a single Staff with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Staff.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Staff with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Staff with id=" + id,
      });
    });
};

// Update a Staff by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Staff.update(req.body, {
    where: { staffNo: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Staff was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Staff with id=${id}. Maybe Staff was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Staff with id=" + id,
      });
    });
};

// Delete a Staff with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Staff.destroy({
    where: { staffNo: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Staff was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Staff with id=${id}. Maybe Staff was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Staff with id=" + id,
      });
    });
};

// Delete all Staff from the database.
exports.deleteAll = (req, res) => {
  Staff.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Staff were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all staff.",
      });
    });
};