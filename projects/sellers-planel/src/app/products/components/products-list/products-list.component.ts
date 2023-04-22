import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  constructor() { }
  isAccordionOpen = false;

  ngOnInit() {
  }
  openModal(id: number) {}
  closeModal() {
  }
  DeleteMehtods(id: number){}
  toggleAccordion(): void {
    this.isAccordionOpen = !this.isAccordionOpen;
  }

  showAccordion(): void {
    this.isAccordionOpen = true;
  }

  hideAccordion(): void {
    this.isAccordionOpen = false;
  }
}
