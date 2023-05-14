const express = require("express");
const app = express();
const oktatoRoute = express.Router();

// Model
let Models = require("../Models");
let Oktato = Models.oktato;

// Add
oktatoRoute.route("/addO").post((req, res, next) => {
	Oktato.create(req.body, (error, data) => {
		if (error) {
			console.log(error);
		} else {
			res.json(data);
		}
	});
});

// Get All
oktatoRoute.route("/getallO").get((req, res) => {
	Oktato.find((error, data) => {
		if (error) {
			return next(error);
		} else {
			res.json(data);
		}
	});
});

// Get single
oktatoRoute.route("/getO/:id").get((req, res) => {
	Oktato.findById(req.params.id, (error, data) => {
		if (error) {
			return next(error);
		} else {
			res.json(data);
		}
	});
});

//Get targyek
oktatoRoute.route("/getTO/:id").get((req, res) => {});

// Update
oktatoRoute.route("/updateO/:id").put((req, res, next) => {
	Oktato.findByIdAndUpdate(
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
oktatoRoute.route("/deleteO/:id").delete((req, res, next) => {
	Oktato.findOneAndRemove(req.params.id, (error, data) => {
		if (error) {
			return next(error);
		} else {
			res.status(200).json({
				msg: data,
			});
		}
	});
});

module.exports = oktatoRoute;
