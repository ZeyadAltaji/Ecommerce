import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { PageModule } from './page/page.module';
import { ProfileUserModule } from './profile-user/profile-user.module';
import { SharedModule } from './shared/shared.module';
import { SweetAlertService } from './services/SweetAlert.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsComponent } from './page/components/settings/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    PageModule,
    ProfileUserModule,
    BrowserAnimationsModule

  ],
  providers: [CookieService],
  bootstrap: [AppComponent,
   ]
})
export class AppModule { }
