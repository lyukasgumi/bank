import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";
import { FormErrorMatcherService } from "src/app/service/form-error-matcher.service";

@Component({
	selector: "app-create-account",
	templateUrl: "./create-account.component.html",
	styleUrls: ["./create-account.component.css"],
})
export class CreateAccountComponent implements OnInit {
	createForm: FormGroup;
	newClient: any;

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
			name: ["", [Validators.required, Validators.pattern("^[A-Z].+$")]],
			IDnum: ["", [Validators.required]],
			phone: [""],
			cID: [""],
		});
	}

	submitForm() {
		if (!this.createForm.valid) {
			return false;
		} else {
			this.newClient = this.createForm.value;
			this.newClient.cID = Math.random().toString().substr(2, 6);
			this.apiService.createClient(this.newClient).subscribe(
				() => {
					console.log("success?");
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}
}
