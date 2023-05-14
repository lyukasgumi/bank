import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DeleteRentableComponent } from "src/app/dialog/delete-rentable/delete-rentable.component";
import { ApiService } from "src/app/service/api.service";
import { TargyCreateComponent } from "../targy-create/targy-create.component";
import { TargyEditComponent } from "../targy-edit/targy-edit.component";

@Component({
	selector: "app-targy-list",
	templateUrl: "./targy-list.component.html",
	styleUrls: ["./targy-list.component.css"],
})
export class TargyListComponent implements OnInit {
	Targyak: any = [];
	imgClass;

	constructor(private apiService: ApiService, public dialog: MatDialog) {
		this.readTargyak();
	}

	ngOnInit(): void {}

	readTargyak() {
		this.apiService.getTargyak().subscribe((data) => {
			this.Targyak = data;
		});
	}

	removeTargy(targy, index) {
		const dialogRef = this.dialog.open(DeleteRentableComponent);

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.apiService.deleteTargy(targy._id).subscribe((data) => {
					this.Targyak.splice(index, 1);
				});
			}
		});
	}

	editTargy(targy, index) {
		const dialogRef = this.dialog.open(TargyEditComponent, {
			data: { myobj: targy, index: index },
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.readTargyak();
			}
		});
	}

	createTargy() {
		const dialogRef = this.dialog.open(TargyCreateComponent);

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.readTargyak();
			}
		});
	}
}
