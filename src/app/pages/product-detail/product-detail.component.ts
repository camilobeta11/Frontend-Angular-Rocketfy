import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {

  unsubscribe$: Subject<void> = new Subject<void>();
  product: IProduct | undefined;
  viewModaldelete = false;
  id!: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      if (productId) {
        this.productService.getProductById(productId).pipe(
          takeUntil(this.unsubscribe$)).subscribe((data) => {
            this.product = data;
          });
      }
    });
  }

  ngOnDestroy() {
    if (this.unsubscribe$) {
      this.unsubscribe$.complete();
      this.unsubscribe$.next();
    }
  }
  editProduct() {
    if (this.product && this.product._id) {
      this.router.navigate(['/products/edit', this.product._id]);
    }
  }

  modalDelete(id: string) {
    this.id = id;
    this.viewModaldelete = true;
  }
}
