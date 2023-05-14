const express = require("express");
const app = express();
const targyRoute = express.Router();

// Model
let Models = require("../Models");
let Targy = Models.targy;

// Add
targyRoute.route("/addT").post((req, res, next) => {
	Targy.create(req.body, (error, data) => {
		if (error) {
			console.log(error);
		} else {
			res.json(data);
		}
	});
});

// Get All
targyRoute.route("/getallT").get((req, res) => {
	Targy.find((error, data) => {
		if (error) {
			return next(error);
		} else {
			res.json(data);
		}
	});
});

// Get single
targyRoute.route("/getT/:id").get((req, res) => {
	Targy.findById(req.params.id, (error, data) => {
		if (error) {
			return next(error);
		} else {
			res.json(data);
		}
	});
});

// Update
targyRoute.route("/updateT/:id").put((req, res, next) => {
	Targy.findByIdAndUpdate(
		req.params.id,
		{
			$set: req.body,
		},
		(error, data) => {
			if (error) {
				return next(error);
			} else {
				res.json(data);
				console.log("Data updated successfully");
			}
		}
	);
});

// Delete
targyRoute.route("/deleteT/:id").delete((req, res, next) => {
	Targy.findOneAndRemove(req.params.id, (error, data) => {
		if (error) {
			return next(error);
		} else {
			res.status(200).json({
				msg: data,
			});
		}
	});
});

module.exports = targyRoute;
