import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AreasModule } from './Areas/Areas.module';
import { SharedModule } from "../../../my-app/src/app/shared/shared.module";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [
      AuthenticationService
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AreasModule,
        SharedModule,
        HttpClientModule,
        ReactiveFormsModule
    ]
})
export class AppModule { }
