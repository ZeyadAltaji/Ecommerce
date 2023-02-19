import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AreasModule } from './Areas/Areas.module';
import { SharedModule } from "../../../my-app/src/app/shared/shared.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AreasModule,
        SharedModule
    ]
})
export class AppModule { }
