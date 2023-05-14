import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ApiService } from "src/app/service/api.service";
import { FormErrorMatcherService } from "src/app/service/form-error-matcher.service";

interface IOptions {
	value: string;
	viewValue: string;
}

export interface DialogData {
	myobj: any;
	id: number;
}

@Component({
	selector: "app-targy-edit",
	templateUrl: "./targy-edit.component.html",
	styleUrls: ["./targy-edit.component.css"],
})
export class TargyEditComponent implements OnInit {
	submitted = false;

	Oktatok: any = [];
	selected: any;

	createForm: FormGroup;

	matcher = new FormErrorMatcherService();

	tipusok: IOptions[] = [
		// "MATH", "CODE", "PHYSICS", "ECONOMICS", "OTHER"
		{ value: "MATH", viewValue: "Mathematics" },
		{ value: "CODE", viewValue: "IT" },
		{ value: "PHYSICS", viewValue: "Physics" },
		{ value: "ECONOMICS", viewValue: "Economics" },
		{ value: "OTHER", viewValue: "Other" },
	];

	constructor(
		private formBuilder: FormBuilder,
		private apiService: ApiService,
		@Inject(MAT_DIALOG_DATA) public data: DialogData
	) {
		this.mainForm();
		this.setForm(data.myobj._id);
	}

	get myForm() {
		return this.createForm.controls;
	}

	ngOnInit(): void {}

	mainForm() {
		this.createForm = this.formBuilder.group({
			nev: ["", [Validators.required]],
			targykod: ["", [Validators.required]],
			kredit: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
			tipus: ["", [Validators.required]],
		});
	}

	setForm(id) {
		this.apiService.getTargy(id).subscribe((data) => {
			this.createForm.setValue({
				nev: data["nev"],
				targykod: data["targykod"],
				kredit: data["kredit"],
				tipus: data["tipus"],
			});
		});
		this.apiService.getOktatok().subscribe((data) => {
			this.Oktatok = data;
			this.Oktatok.forEach((oktato) => {
				oktato.oktatotttargyak.forEach((targy) => {
					if (targy._id === id) {
						this.selected = oktato;
					}
				});
			});
			console.log(this.selected);
		});
	}

	submitForm() {
		if (!this.createForm.valid) {
			return false;
		} else {
			this.apiService
				.updateTargy(this.data.myobj._id, this.createForm.value)
				.subscribe(
					(res) => {
						this.selected.oktatotttargyak.push(res);
						this.apiService
							.updateOktato(this.selected._id, this.selected)
							.subscribe(() => {
								console.log("Oktato updated!");
							});
						console.log("Tárgy successfully created!!");
					},
					(error) => {
						console.log(error);
					}
				);
		}
	}
}
