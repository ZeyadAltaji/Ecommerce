import { Component, OnInit } from '@angular/core';
import {  OwlOptions } from 'ngx-owl-carousel-o';
import { SiderMain } from 'projects/dashboard/src/app/Classes/SiderMain';
import { SliderMainService } from 'projects/dashboard/src/app/services/SliderMain.service';

@Component({
  selector: 'app-section-home',
  templateUrl: './section-home.component.html',
  styleUrls: ['./section-home.component.css']
})
export class SectionHomeComponent implements OnInit {

  constructor(public slidermainService :SliderMainService) {  }
  Data: SiderMain[] = [];
  SiderMain = new SiderMain();

  imageMain: any;
  MainImage='';
  UrlImage = '';

  ngOnInit(): void {
this.getMainSlider();
  }
  getMainSlider() {
    this.slidermainService.GetAllSiderMain().subscribe({
      next: (listData) => {

        if (Array.isArray(listData) && listData.length > 0 && listData[0].imageURl) {
          this.Data=listData

          this.imageMain = listData[0];

          this.MainImage = `http://localhost:4203/assets/image/Slider/${this.imageMain.imageURl}`;
          console.log(this.MainImage);
        }
        this.SiderMain = listData;
        console.log(listData)
        if (listData && listData.imageURl) {
          this.UrlImage = `http://localhost:4203/assets/image/Slider/${listData.imageURl}`;
          console.log(this.UrlImage)
        }
      }
    });
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplaySpeed: 5000,
    smartSpeed: 1500,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }
}
