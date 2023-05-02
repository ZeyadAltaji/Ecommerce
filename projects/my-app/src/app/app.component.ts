import { Component, OnInit } from '@angular/core';
import { SettingService } from 'projects/dashboard/src/app/services/Setting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  logoData='';
  constructor(private settingservice: SettingService) {}
  ngOnInit() {
     this.getLogoData();
  }

  setFavicon() {
    const link: HTMLLinkElement | null = document.querySelector('link[rel="icon"]');
    if (link) {
      link.href = this.logoData;
    }
  }
  getLogoData() {
    this.settingservice.GetByIDlogo(1).subscribe(data => {

      this.logoData = `http://localhost:4203/assets/image/Setting/Logo/${data.isLogoUrl}`;

   });
 }



}
