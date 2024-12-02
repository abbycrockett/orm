const db = require("../models");
const PropertyInspection = db.propertyInspection;

// Create and Save a new PropertyInspection
exports.create = (req, res) => {
  // Validate request
  if (!req.body.propertyNo || !req.body.iDate || !req.body.iTime || !req.body.staffNo) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a PropertyInspection
  const propertyInspection = {
    propertyNo: req.body.propertyNo,
    iDate: req.body.iDate,
    iTime: req.body.iTime,
    comments: req.body.comments,
    staffNo: req.body.staffNo,
  };

  // Save PropertyInspection in the database
  PropertyInspection.create(propertyInspection)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the PropertyInspection.",
      });
    });
};

// Retrieve all PropertyInspections from the database.
exports.findAll = (req, res) => {
  PropertyInspection.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving property inspections.",
      });
    });
};

// Retrieve all PropertyInspections for a single property
exports.findAllForProperty = (req, res) => {
  const propertyNo = req.params.propertyNo;

  PropertyInspection.findAll({
    where: {
      propertyNo: propertyNo
    }
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving property inspections for the property.",
      });
    });
};

// Retrieve a single PropertyInspection with propertyNo and iDate
exports.findOne = (req, res) => {
  const propertyNo = req.params.propertyNo;
  const iDate = req.params.iDate;

  PropertyInspection.findOne({
    where: {
      propertyNo: propertyNo,
      iDate: iDate
    }
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find PropertyInspection with propertyNo=${propertyNo} and iDate=${iDate}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving PropertyInspection with propertyNo=" + propertyNo + " and iDate=" + iDate,
      });
    });
};

// Update a PropertyInspection by the propertyNo and iDate in the request
exports.update = (req, res) => {
  const propertyNo = req.params.propertyNo;
  const iDate = req.params.iDate;

  PropertyInspection.update(req.body, {
    where: {
      propertyNo: propertyNo,
      iDate: iDate
    }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "PropertyInspection was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update PropertyInspection with propertyNo=${propertyNo} and iDate=${iDate}. Maybe PropertyInspection was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating PropertyInspection with propertyNo=" + propertyNo + " and iDate=" + iDate,
      });
    });
};

// Delete a PropertyInspection with the specified propertyNo and iDate in the request
exports.delete = (req, res) => {
  const propertyNo = req.params.propertyNo;
  const iDate = req.params.iDate;

  PropertyInspection.destroy({
    where: {
      propertyNo: propertyNo,
      iDate: iDate
    }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "PropertyInspection was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete PropertyInspection with propertyNo=${propertyNo} and iDate=${iDate}. Maybe PropertyInspection was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete PropertyInspection with propertyNo=" + propertyNo + " and iDate=" + iDate,
      });
    });
};

// Delete all PropertyInspections from the database.
exports.deleteAll = (req, res) => {
  PropertyInspection.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} PropertyInspections were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all property inspections.",
      });
    });
};