import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { PageModule } from './page/page.module';
import { ProfileUserModule } from './profile-user/profile-user.module';
import { SharedModule } from './shared/shared.module';

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
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
