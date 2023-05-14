import { LayoutModule } from "@angular/cdk/layout";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import {
	ErrorStateMatcher,
	ShowOnDirtyErrorStateMatcher,
} from "@angular/material/core";
import {
	MatDialogModule,
	MAT_DIALOG_DEFAULT_OPTIONS,
} from "@angular/material/dialog";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HallgatoCreateComponent } from "./components/hallgato-create/hallgato-create.component";
import { HallgatoEditComponent } from "./components/hallgato-edit/hallgato-edit.component";
import { HallgatoListComponent } from "./components/hallgato-list/hallgato-list.component";
import { OktatoCreateComponent } from "./components/oktato-create/oktato-create.component";
import { OktatoEditComponent } from "./components/oktato-edit/oktato-edit.component";
import { OktatoListComponent } from "./components/oktato-list/oktato-list.component";
import { TargyCreateComponent } from "./components/targy-create/targy-create.component";
import { TargyEditComponent } from "./components/targy-edit/targy-edit.component";
import { TargyListComponent } from "./components/targy-list/targy-list.component";
import { DeleteRentableComponent } from "./dialog/delete-rentable/delete-rentable.component";
import { MaterialModule } from "./material.module";
import { ApiService } from "./service/api.service";

@NgModule({
	declarations: [
		AppComponent,

		DeleteRentableComponent,

		OktatoListComponent,
		OktatoCreateComponent,
		OktatoEditComponent,
		HallgatoListComponent,
		HallgatoCreateComponent,
		HallgatoEditComponent,
		TargyEditComponent,
		TargyListComponent,
		TargyCreateComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		LayoutModule,
		MaterialModule,
		ReactiveFormsModule,
		MatDialogModule,
		FlexLayoutModule,
	],
	providers: [
		ApiService,
		{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS,
			useValue: { hasBackdrop: true },
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
