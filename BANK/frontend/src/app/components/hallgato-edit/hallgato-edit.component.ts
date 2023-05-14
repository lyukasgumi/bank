import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ApiService } from "src/app/service/api.service";
import { FormErrorMatcherService } from "src/app/service/form-error-matcher.service";

export interface DialogData {
	myobj: any;
	id: number;
}

interface IOptions {
	value: Number;
	viewValue: string;
}

@Component({
	selector: "app-hallgato-edit",
	templateUrl: "./hallgato-edit.component.html",
	styleUrls: ["./hallgato-edit.component.css"],
})
export class HallgatoEditComponent implements OnInit {
	editForm: FormGroup;
	targyForm: FormGroup;

	selectedjegy: any;

	newHallgato: any;

	Targyakjegyel: any = [];

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
		private apiService: ApiService,
		@Inject(MAT_DIALOG_DATA) public data: DialogData
	) {
		this.mainForm();
		this.setForm(this.data.myobj._id);
	}

	ngOnInit(): void {}

	get myForm() {
		return this.editForm.controls;
	}

	mainForm() {
		this.editForm = this.formBuilder.group({
			nev: ["", [Validators.required]],
			tankor: ["", [Validators.required]],
		});
	}

	setForm(id) {
		this.apiService.getHallgato(id).subscribe((data) => {
			this.editForm.setValue({
				nev: data["nev"],
				tankor: data["tankor"],
			});
			this.Targyakjegyel = data.targyakjegyel;
		});
	}

	submitForm() {
		if (!this.editForm.valid) {
			return false;
		} else {
			this.newHallgato = this.editForm.value;
			this.newHallgato.targyakjegyel = this.Targyakjegyel;
			this.apiService
				.updateHallgato(this.data.myobj._id, this.newHallgato)
				.subscribe(
					(res) => {
						console.log("Content updated successfully!");
					},
					(error) => {
						console.log(error);
					}
				);
		}
	}
}
//TODO: This is a dialog! Put it in the dialog folder and refactor.
