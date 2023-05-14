const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let targySchema = new Schema(
	{
		targykod: String,
		nev: String,
		kredit: {
			type: Number,
		},
		tipus: {
			type: String,
			enum: ["MATH", "CODE", "PHYSICS", "ECONOMICS", "OTHER"],
			default: "OTHER",
		},
	},
	{
		collection: "targyak",
	}
);

let oktatoSchema = new Schema(
	{
		nev: String,
		tanszek: String,
		oktatotttargyak: [],
	},
	{
		collection: "oktatok",
	}
);

let hallgatoSchema = new Schema(
	{
		nev: String,
		tankor: String,
		targyakjegyel: [],
	},
	{
		collection: "hallgatok",
	}
);

let rentableSchema = new Schema(
	{
		title: String,
		dateofAcquisition: Date,
		serNum: {
			type: Number,
		},
		state: {
			type: String,
			enum: ["AVAILABLE", "RENTED", "RUINED"],
			default: "AVAILABLE",
		},
		type: {
			type: String,
			enum: ["DVD", "CASSETTE", "OTHER"],
			default: "DVD",
		},
	},
	{
		collection: "rentables",
	}
);

let rentSchema = new Schema(
	{
		dateofRent: Date,
		expiry: Date,
		Rented: [],
	},
	{
		collection: "rents",
	}
);

let clientSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		phoneNum: {
			type: Number,
		},
		IDnum: {
			type: Number,
			unique: true,
			required: true,
		},
		address: {
			city: String,
			street: String,
			house: Number,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
		Rents: [],
	},
	{
		collection: "clients",
	}
);

module.exports = {
	rentable: mongoose.model("Rentable", rentableSchema),
	rent: mongoose.model("Rent", rentSchema),
	client: mongoose.model("Client", clientSchema),
	targy: mongoose.model("Targy", targySchema),
	oktato: mongoose.model("Oktato", oktatoSchema),
	hallgato: mongoose.model("Hallgato", hallgatoSchema),
};
