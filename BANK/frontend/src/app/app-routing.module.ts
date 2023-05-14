import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountsComponent } from "./components/accounts/accounts.component";
import { AssessmentComponent } from "./components/assessment/assessment.component";
import { ClientsComponent } from "./components/clients/clients.component";
import { TransactionsComponent } from "./components/transactions/transactions.component";

const routes: Routes = [
	{ path: "", pathMatch: "full", redirectTo: "clients" },
	{ path: "clients", component: ClientsComponent },
	{ path: "accounts", component: AccountsComponent },
	{ path: "transactions", component: TransactionsComponent },
	{ path: "assessment", component: AssessmentComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
