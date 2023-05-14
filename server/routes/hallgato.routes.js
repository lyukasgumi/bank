const express = require("express");
const app = express();
const hallgatoRoute = express.Router();

// Model
let Models = require("../Models");
let Hallgato = Models.hallgato;

// Add
hallgatoRoute.route("/addH").post((req, res, next) => {
	Hallgato.create(req.body, (error, data) => {
		if (error) {
			console.log(error);
		} else {
			res.json(data);
		}
	});
});

// Get All
hallgatoRoute.route("/getallH").get((req, res) => {
	Hallgato.find((error, data) => {
		if (error) {
			return next(error);
		} else {
			res.json(data);
		}
	});
});

// Get single
hallgatoRoute.route("/getH/:id").get((req, res) => {
	Hallgato.findById(req.params.id, (error, data) => {
		if (error) {
			return next(error);
		} else {
			res.json(data);
		}
	});
});

// Update
hallgatoRoute.route("/updateH/:id").put((req, res, next) => {
	Hallgato.findByIdAndUpdate(
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
hallgatoRoute.route("/deleteH/:id").delete((req, res, next) => {
	Hallgato.findOneAndRemove(req.params.id, (error, data) => {
		if (error) {
			return next(error);
		} else {
			res.status(200).json({
				msg: data,
			});
		}
	});
});

module.exports = hallgatoRoute;
