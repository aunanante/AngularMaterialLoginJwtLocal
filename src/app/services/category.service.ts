import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../common/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl = 'http://localhost:8080/api/categories/admin';
  //private categoryUrl = 'http://progvcp-env.eba-ufqawf5p.us-east-1.elasticbeanstalk.com/api/categories/admin';

  constructor(private httpClient: HttpClient) { }

  getAllCategories(): Observable< Category[]> {

    return this.httpClient.get< Category[]>(this.categoryUrl+'/');
  }

  getCategoryByCommerceId(id: number): Observable<Category[]> {

    return this.httpClient.get<any>(this.categoryUrl+'/commerce/'+id)
    
  }

  getCategoryById(id: number): Observable<Category> {

    return this.httpClient.get<any>(this.categoryUrl+'/'+id)
    
  }

  createCategory(category: Category): Observable<any> {

    return this.httpClient.post<any>(this.categoryUrl, category);
    
  }

  updateCategory(id: number, category: Category): Observable<Category[]> {

    return this.httpClient.put<any>(this.categoryUrl+'/'+id, category);
  }

  deleteCategory(id: number): Observable<Category[]> {

    return this.httpClient.delete<any>(this.categoryUrl+'/'+id);
  }

}
