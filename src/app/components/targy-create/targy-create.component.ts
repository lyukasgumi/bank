import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";
import { FormErrorMatcherService } from "src/app/service/form-error-matcher.service";

interface IOptions {
	value: string;
	viewValue: string;
}

@Component({
	selector: "app-targy-create",
	templateUrl: "./targy-create.component.html",
	styleUrls: ["./targy-create.component.css"],
})
export class TargyCreateComponent implements OnInit {
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
		private apiService: ApiService
	) {
		this.mainForm();
	}

	get myForm() {
		return this.createForm.controls;
	}

	ngOnInit(): void {
		this.readOktatok();
	}

	mainForm() {
		this.createForm = this.formBuilder.group({
			nev: ["", [Validators.required]],
			targykod: ["", [Validators.required]],
			kredit: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
			tipus: ["", [Validators.required]],
		});
	}

	readOktatok() {
		this.apiService.getOktatok().subscribe((data) => {
			this.Oktatok = data;
			console.log(this.Oktatok);
		});
	}

	submitForm() {
		if (!this.createForm.valid && this.selected != null) {
			return false;
		} else {
			this.apiService.createTargy(this.createForm.value).subscribe(
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

//TODO: This is a dialog! Put it in the dialog folder and refactor.
