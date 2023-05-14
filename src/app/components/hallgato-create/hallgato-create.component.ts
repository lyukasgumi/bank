import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";
import { FormErrorMatcherService } from "src/app/service/form-error-matcher.service";

interface IOptions {
	value: Number;
	viewValue: string;
}

@Component({
	selector: "app-hallgato-create",
	templateUrl: "./hallgato-create.component.html",
	styleUrls: ["./hallgato-create.component.css"],
})
export class HallgatoCreateComponent implements OnInit {
	createForm: FormGroup;
	targyForm: FormGroup;

	Targyak: any = [];
	Targyakjegyel: any = [];
	selectedtargy: any;
	selectedjegy: any;

	newHallgato: any;

	jegyopciok: IOptions[] = [
		{ value: 5, viewValue: "5" },
		{ value: 4, viewValue: "4" },
		{ value: 3, viewValue: "3" },
		{ value: 2, viewValue: "2" },
		{ value: 1, viewValue: "1" },
	];

	matcher = new FormErrorMatcherService();

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
		this.getTargyak();
	}

	mainForm() {
		this.createForm = this.formBuilder.group({
			nev: ["", [Validators.required, Validators.pattern("^[A-Z].+$")]],
			tankor: ["", [Validators.required]],
			targyakjegyel: [""],
		});

		this.targyForm = this.formBuilder.group({
			targypicked: [""],
			jegypicked: [""],
		});
	}

	getTargyak() {
		this.apiService.getTargyak().subscribe((data) => {
			this.Targyak = data;
		});
	}

	addTargyjegyel(id) {
		//console.log(this.targyForm.)
		this.Targyakjegyel.push({
			targy: this.selectedtargy,
			jegy: this.selectedjegy,
		});
		this.Targyak.splice(
			this.Targyak.findIndex((t) => t._id === id),
			1
		);
	}

	submitForm() {
		if (!this.createForm.valid) {
			return false;
		} else {
			console.log(
				"ClientCreateComponent -> this.createForm.value",
				this.createForm.value
			);
			this.newHallgato = this.createForm.value;
			this.newHallgato.targyakjegyel = this.Targyakjegyel;
			this.apiService.createHallgato(this.newHallgato).subscribe(
				() => {
					console.log();
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}
}

//TODO: This is a dialog! Put it in the dialog folder and refactor.
