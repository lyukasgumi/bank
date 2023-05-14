import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DeleteRentableComponent } from "src/app/dialog/delete-rentable/delete-rentable.component";
import { ApiService } from "src/app/service/api.service";
import { OktatoCreateComponent } from "../oktato-create/oktato-create.component";
import { OktatoEditComponent } from "../oktato-edit/oktato-edit.component";

@Component({
	selector: "app-oktato-list",
	templateUrl: "./oktato-list.component.html",
	styleUrls: ["./oktato-list.component.css"],
})
export class OktatoListComponent implements OnInit {
	Oktatok: any = [];
	Targyak: any = [];
	panelOpenState = false;
	constructor(private apiService: ApiService, public dialog: MatDialog) {}

	ngOnInit(): void {
		this.readOktatok();
	}

	readOktatok() {
		this.apiService.getOktatok().subscribe((data) => {
			this.Oktatok = data;
			console.log(this.Oktatok);
		});
		this.apiService.getTargyak().subscribe((data) => {
			this.Targyak = data;
		});
	}

	createOktatok() {
		const dialogRef = this.dialog.open(OktatoCreateComponent);

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.readOktatok();
				console.log(this.Oktatok);
			}
		});
	}

	deleteOktato(oktato) {
		const dialogRef = this.dialog.open(DeleteRentableComponent);
		oktato.isDeleted = !oktato.isDeleted;
		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.apiService.deleteOktato(oktato._id).subscribe((data) => {
					this.readOktatok();
				});
			}
		});
	}
	editOktato(oktato) {
		const dialogRef = this.dialog.open(OktatoEditComponent, {
			data: { myobj: oktato, index: oktato._id },
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.readOktatok();
			}
		});
	}
}
