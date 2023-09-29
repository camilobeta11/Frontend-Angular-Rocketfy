import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';

import { IProduct } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  unsubscribe$: Subject<void> = new Subject<void>();
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;
  pageNumbers: number[] = [];
  searchQuery!: string;
  stock! : number;
  selectedTags: string = 'all';
  uniqueTags: string[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.calculateUniqueTags();
  }

  ngOnDestroy() {
    if (this.unsubscribe$) {
      this.unsubscribe$.complete();
      this.unsubscribe$.next();
    }
  }

  loadProducts() {
    this.productService.getProducts(this.currentPage, this.itemsPerPage)
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError((error) => {
          console.error('Error al cargar productos:', error);
          return throwError('Error al cargar productos. Intente nuevamente más tarde.');
        })
      )
      .subscribe((data: any) => {
        this.products = data.products;
        this.currentPage = data.currentPage;
        this.totalPages = data.totalPages;
        this.calculateUniqueTags();
        this.updatePageNumbers();
      });
  }

  searchProducts(param?: string) {
    const params: any = {};

    if (param === 'name') {
      if (this.searchQuery) {
        params.name = this.searchQuery;
      }

      if (this.searchQuery.length === 0) {
        this.loadProducts()
      }
    }
    if (param === 'tags') {
      if (this.selectedTags) {
        params.tags = this.selectedTags;
      }

      if (this.selectedTags == 'all') {
        this.loadProducts();
      }
    }

    if (param === 'stock') {
      if (this.stock) {
        params.stock = this.stock;
      }
    }

    this.productService.searchProducts(params)
      .pipe(
        takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        this.products = data;
      });
  }
  updatePageNumbers() {
    this.pageNumbers = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pageNumbers.push(i);
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadProducts();
  }

  calculateUniqueTags() {
    const allTags: string[] = [];

    this.products.forEach((product) => {
      allTags.push(...product.tags);
    });

    this.uniqueTags = Array.from(new Set(allTags)).sort();
  }

  productDetail(i: IProduct) {
    this.router.navigateByUrl(`/products/${i._id}`);
  }

}
