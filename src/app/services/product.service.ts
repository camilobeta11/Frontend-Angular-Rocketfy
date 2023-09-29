import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl =  environment.url;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apiUrl}/products`);
  }

  getProductById(productId: string): Observable<IProduct> {
    const url = `${this.apiUrl}/products/${productId}`;
    return this.http.get<IProduct>(url);
  }

  createProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.apiUrl}/products`, product);
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    const url = `${this.apiUrl}/products/${product._id}`;
    return this.http.put<IProduct>(url, product);
  }

  deleteProduct(productId: string): Observable<void> {
    const url = `${this.apiUrl}/products/${productId}`;
    return this.http.delete<void>(url);
  }
}
