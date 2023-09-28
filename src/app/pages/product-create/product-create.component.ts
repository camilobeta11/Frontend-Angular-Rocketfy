import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IProduct } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent {

  productForm!: FormGroup;
  tags: string[] = [];
  tag!: string;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      sku: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      tags: [[]]
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
    if (this.productForm.valid) {
      this.productForm.get('tags')?.setValue(this.tags);
      const newProduct: IProduct = this.productForm.value;
      this.productService.createProduct(newProduct).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }
}
