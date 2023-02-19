import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class HomePageComponent{

  ExternalParts: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplaySpeed: 7000,
    smartSpeed: 1500,
    autoplayHoverPause: true,
    dots: true,
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

    nav: false,
  };
  brand: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    margin:10,
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
        items: 3
      },
      940: {
        items: 9
      }
    },

    nav: false,
  };
  brandcars: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    margin:3,
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
        items: 3
      },
      940: {
        items: 9
      }
    },

    nav: false,
  };
  SpatialsOffer: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: false,
    margin:10,
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
        items: 3
      },
      940: {
        items: 9
      }
    },


  };


}
