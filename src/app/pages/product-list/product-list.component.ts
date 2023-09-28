import { Component } from '@angular/core';

import { catchError, throwError } from 'rxjs';

import { IProduct } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  searchQuery = '';

  minPrice = 0;
  maxPrice = 1000;
  selectedTags: string[] = [];
  uniqueTags: string[] = ['mobile'];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.calculateUniqueTags();
  }

  loadProducts() {
    this.productService.getProducts()
      .pipe(
        catchError((error) => {
          console.error('Error al cargar productos:', error);
          return throwError('Error al cargar productos. Intente nuevamente más tarde.');
        })
      )
      .subscribe((data) => {
        this.products = data;
        this.searchProducts();
      });
  }
  searchProducts() {
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }


  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  filterProducts() {
    this.filteredProducts = this.filteredProducts.filter((product) =>
      product.price >= this.minPrice && product.price <= this.maxPrice
    );
    if (this.selectedTags.length > 0) {
      this.filteredProducts = this.filteredProducts.filter((product) =>
        product.tags.some((tag) => this.selectedTags.includes(tag))
      );
    }
  }

  calculateUniqueTags() {
    const allTags: string[] = [];

    this.products.forEach((product) => {
      allTags.push(...product.tags);
    });

    // this.uniqueTags = Array.from(new Set(allTags)).sort();
  }
}