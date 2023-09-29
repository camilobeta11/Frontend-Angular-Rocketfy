import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.url;

  constructor(private http: HttpClient) { }

  getProducts(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<any>(`${this.apiUrl}/products`, { params });
  }

  getProductById(productId: string): Observable<IProduct> {
    const url = `${this.apiUrl}/products/filter/${productId}`;
    return this.http.get<IProduct>(url);
  }

  createProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.apiUrl}/products`, product);
  }

  updateProduct(product: IProduct, id: string): Observable<IProduct> {
    const url = `${this.apiUrl}/products/${id}`;
    return this.http.put<IProduct>(url, product);
  }

  deleteProduct(productId: string): Observable<void> {
    const url = `${this.apiUrl}/products/${productId}`;
    return this.http.delete<void>(url);
  }

  searchProducts(params: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/search`, { params: params });
  }
}
