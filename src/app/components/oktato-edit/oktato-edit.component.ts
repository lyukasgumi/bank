import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ApiService } from "src/app/service/api.service";
import { FormErrorMatcherService } from "src/app/service/form-error-matcher.service";

export interface DialogData {
	myobj: any;
	id: number;
}

@Component({
	selector: "app-oktato-edit",
	templateUrl: "./oktato-edit.component.html",
	styleUrls: ["./oktato-edit.component.css"],
})
export class OktatoEditComponent implements OnInit {
	editForm: FormGroup;

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
			nev: ["", [Validators.required, Validators.min(3)]],
			tanszek: ["", [Validators.required, Validators.min(3)]],
		});
	}

	setForm(id) {
		this.apiService.getOktato(id).subscribe((data) => {
			this.editForm.setValue({
				nev: data["nev"],
				tanszek: data["tanszek"],
				oktatotttargyak: data["oktatotttargyak"],
			});
			/*this.editForm.patchValue({
				name: data.name,
			});*/

			/*this.editForm.controls.address
				.get("city")
				.setValue(data.address.city);*/
		});
	}

	submitForm() {
		if (!this.editForm.valid) {
			return false;
		} else {
			this.apiService
				.updateOktato(this.data.myobj._id, this.editForm.value)
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
