import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent {
  unsubscribe$: Subject<void> = new Subject<void>();
  productForm!: FormGroup;
  tags: string[] = [];
  tag!: string;
  originalProduct: any | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getProduct();
  }

  ngOnDestroy() {
    if (this.unsubscribe$) {
      this.unsubscribe$.complete();
      this.unsubscribe$.next();
    }
  }

  createForm() {
    this.productForm = this.fb.group({
      _id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      sku: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      tags: [[]]
    });
  }

  getProduct() {
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      if (productId) {
        this.productService.getProductById(productId).pipe(
          takeUntil(this.unsubscribe$)).subscribe((data) => {
            this.productForm.patchValue(data);
            this.originalProduct = { ...data };
            this.tags = this.productForm.get('tags')?.value;
          });
      }
    });
  }

  addTag() {
    this.tags.push(this.tag);
    this.tag = '';
  }
  removeTag(index: any) {
    this.tags.splice(index, 1);
  }


  onSubmit() {
    if (this.productForm.valid && this.originalProduct) {
      const updatedProduct: any = {};

      for (const key in this.productForm.controls) {
        if (this.productForm.controls[key].value !== this.originalProduct[key]) {
          updatedProduct[key] = this.productForm.controls[key].value;
        }
      }

      if (this.tags.length > 0) {
        updatedProduct.tags = this.tags;
        this.productForm.get('tags')?.setValue(this.tags);
      }

      if (Object.keys(updatedProduct).length > 0) {
        console.log(updatedProduct)
        this.productService.updateProduct(updatedProduct, this.productForm.get('_id')?.value).pipe(
          takeUntil(this.unsubscribe$))
          .subscribe(() => {
            this.router.navigate(['/products']);
          });
      }
    }
  }
}
