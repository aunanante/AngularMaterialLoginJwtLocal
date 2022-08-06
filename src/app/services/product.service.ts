import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = 'http://localhost:8080/api/products/admin';
 //private productUrl = 'http://progvcp-env.eba-ufqawf5p.us-east-1.elasticbeanstalk.com/api/products/admin';

  constructor(private httpClient: HttpClient) { }

  getAllProducts(): Observable< Product[]> {

    return this.httpClient.get< Product[]>(this.productUrl+'/');
  }

  getProductByCategoryId(id: number): Observable<Product[]> {

    return this.httpClient.get<any>(this.productUrl+'/category/'+id)
    
  }

  getProductById(id: number): Observable<Product> {

    return this.httpClient.get<any>(this.productUrl+'/'+id)
    
  }

  createProduct(product: Product): Observable<Product[]> {

    return this.httpClient.post<any>(this.productUrl, product);
    
  }

  updateProduct(id: number, product: Product): Observable<Product[]> {

    return this.httpClient.put<any>(this.productUrl+'/'+id, product);
  }

  deleteProduct(id: number): Observable<Product[]> {

    return this.httpClient.delete<any>(this.productUrl+'/'+id);
  }

}
