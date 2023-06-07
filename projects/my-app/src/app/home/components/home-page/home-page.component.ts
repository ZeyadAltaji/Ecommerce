import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Brands } from 'projects/dashboard/src/app/Classes/Brands';
import { Cars } from 'projects/dashboard/src/app/Classes/Cars';
import { Product } from 'projects/dashboard/src/app/Classes/Product';
import { SiderSub } from 'projects/dashboard/src/app/Classes/SiderSub';
import { ISubProducts } from 'projects/dashboard/src/app/Models/ISubProducts';
import { BrandsService } from 'projects/dashboard/src/app/services/Brands.service';
import { CarService } from 'projects/dashboard/src/app/services/Car.service';
import { ProductService } from 'projects/dashboard/src/app/services/Product.service';
import { SiderSubService } from 'projects/dashboard/src/app/services/SiderSub.service';
import { SubproductsService } from 'projects/dashboard/src/app/services/Subproducts.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePageComponent implements OnInit {
  constructor(
    public brandsService: BrandsService,
    public siderSubService: SiderSubService,
    public carService: CarService,
    public productService: ProductService,
    public productsService:SubproductsService,

  ) {}
  Data: Brands[] = [];
  DataCars: Cars[] = [];
  DataExternal = new SiderSub();
  DataIndoor = new SiderSub();
  DataMechanical = new SiderSub();
  DataProducts = new Product();
  specialProducts!: ISubProducts[];
  products!: any[]; // Define the products array

  line1: any[] = [];
  line2: any[] = [];
  line3: any[] = [];
  id: any;
  ngOnInit() {
    this.brandsService.GetAllBrands().subscribe(
      (listData) => {
        // shuffle the data array randomly
        this.Data = this.shuffle(listData);

        // split the shuffled array into three parts
        const numPerLine = Math.ceil(this.Data.length / 3);
        this.line1 = this.Data.slice(0, numPerLine);
        this.line2 = this.Data.slice(numPerLine, numPerLine * 2);
        this.line3 = this.Data.slice(numPerLine * 2);
      },
      (error) => {
        console.log('httperror:');
        console.log(error);
      }
    );
    this.siderSubService.GetByIdnumber(1).subscribe((result) => {
      this.DataIndoor = result;
      console.log(result);
    });
    this.siderSubService.GetByIdnumber(2).subscribe((result) => {
      this.DataExternal = result;
      console.log('ss',result);
    });
    this.siderSubService.GetByIdnumber(3).subscribe((result) => {
      this.DataMechanical = result;
      console.log(result);
    });
    this.carService.GetAllCars().subscribe(
      (listData) => {
        this.carService.ListCars = listData;
      },
      (error) => {
        console.log('httperror:');
        console.log(error);
      }
    );
    this.loadSpecialProducts();
  }

  shuffle(array: any[]): any[] {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  loadSpecialProducts(): void {
    this.productsService.GetSpecialProducts().subscribe(listData=>{
      this.productsService.listProducts=listData;
      console.log(listData);
     },
    error => {
      console.log('httperror:');
      console.log(error);
    });

  }
  getRandomDate(): string {
    const currentDate = new Date();
    const randomDays = Math.floor(Math.random() * 7) + 1; // Generates a random number between 1 and 7

    const dueDate = new Date(currentDate);
    dueDate.setDate(currentDate.getDate() - randomDays); // Subtract randomDays from the current date

    return dueDate.toDateString(); // Format the date as a string
  }
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
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },

    nav: false,
  };
  brand: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    margin: 10,
    autoplaySpeed: 5000,
    smartSpeed: 1500,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 3,
      },
      740: {
        items: 3,
      },
      940: {
        items: 9,
      },
    },

    nav: false,
  };
  brandcars: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    margin: 3,
    autoplaySpeed: 5000,
    smartSpeed: 1500,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 3,
      },
      940: {
        items: 9,
      },
    },

    nav: false,
  };
  SpatialsOffer: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: false,
    margin: 10,
    autoplaySpeed: 5000,
    smartSpeed: 1500,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 3,
      },
      940: {
        items:3,
      },
    },
  };
}
