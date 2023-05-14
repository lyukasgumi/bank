import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ApiService } from "src/app/service/api.service";
import { CreateClientComponent } from "../create-client/create-client.component";

@Component({
	selector: "app-clients",
	templateUrl: "./clients.component.html",
	styleUrls: ["./clients.component.css"],
})
export class ClientsComponent implements OnInit {
	Clients: any = [];
	Accounts: any = [];

	constructor(private apiService: ApiService, public dialog: MatDialog) {}

	ngOnInit(): void {
		this.getData();
	}

	getData() {
		this.apiService.getClients().subscribe((data) => {
			this.Clients = data;
		});
	}

	createClient() {
		const dialogRef = this.dialog.open(CreateClientComponent);

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.getData();
			}
		});
	}

	deleteClient(client, index) {}

	editClient(client) {}
}
