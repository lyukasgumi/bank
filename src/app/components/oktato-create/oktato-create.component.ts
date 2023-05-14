import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";
import { FormErrorMatcherService } from "src/app/service/form-error-matcher.service";

@Component({
	selector: "app-oktato-create",
	templateUrl: "./oktato-create.component.html",
	styleUrls: ["./oktato-create.component.css"],
})
export class OktatoCreateComponent implements OnInit {
	createForm: FormGroup;

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

	ngOnInit(): void {}

	mainForm() {
		this.createForm = this.formBuilder.group({
			nev: ["", [Validators.required, Validators.min(3)]],
			tanszek: ["", [Validators.required, Validators.min(3)]],
		});
	}

	submitForm() {
		if (!this.createForm.valid) {
			return false;
		} else {
			console.log(
				"ClientCreateComponent -> this.createForm.value",
				this.createForm.value
			);
			this.apiService.createOktato(this.createForm.value).subscribe(
				() => {
					console.log("Oktato successfully created!!");
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}
}

//TODO: This is a dialog! Put it in the dialog folder and refactor.
