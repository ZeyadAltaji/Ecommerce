import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandsService } from 'projects/dashboard/src/app/services/Brands.service';
import { CarService } from 'projects/dashboard/src/app/services/Car.service';
import { SubproductsService } from 'projects/dashboard/src/app/services/Subproducts.service';

@Component({
  selector: 'app-ShopBy',
  templateUrl: './ShopBy.component.html',
  styleUrls: ['./ShopBy.component.css'],
})
export class ShopByComponent implements OnInit {
  type: string | null;
  title!: string; // Add the title property

  constructor(
    private route: ActivatedRoute,
    public carService: CarService,
    public brandsService: BrandsService,
    public productsService: SubproductsService
  ) {
    this.type = null; // Initialize the type property to null
  }

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type');
    if (this.type === 'brands') {
      this.getAllBrands();
      this.title = 'Brands'; // Set the title to 'Brands'
    } else if (this.type === 'Vehicles') {
      this.getAllCars();
      this.title = 'Vehicles'; // Set the title to 'Vehicles'
    } else if (this.type === 'SpatialsProducts') {
      this.loadSpecialProducts();
      this.title='Spatials Products'
    }
  }
  getAllBrands() {
    this.brandsService.GetAllBrands().subscribe(
      (listData) => {
        this.brandsService.listBrands = listData;
        console.log('brands', listData);
      },
      (error) => {
        console.log('httperror:');
        console.log(error);
      }
    );
  }

  getAllCars() {
    this.carService.GetAllCars().subscribe(
      (listData) => {
        this.carService.ListCars = listData;
        console.log('sas', listData);
      },
      (error) => {
        console.log('httperror:');
        console.log(error);
      }
    );
  }
  loadSpecialProducts(): void {
    this.productsService.GetSpecialProducts().subscribe(
      (listData) => {
        this.productsService.listProducts = listData;
        console.log(listData);
      },
      (error) => {
        console.log('httperror:');
        console.log(error);
      }
    );
  }
}
