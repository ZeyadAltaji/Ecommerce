import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { ProfileUserModule } from './profile-user/profile-user.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AnalyticsModule,
    ProfileUserModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
