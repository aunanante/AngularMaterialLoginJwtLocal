import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commerce } from '../common/commerce';


@Injectable({
  providedIn: 'root'
})
export class CommerceService {

  private commerceUrl = 'http://localhost:8080/api/commerces/admin';
  //private commerceUrl = 'http://progvcp-env.eba-ufqawf5p.us-east-1.elasticbeanstalk.com/api/commerces/admin';

  constructor(private httpClient: HttpClient) { }

  getAllCommerces(): Observable<Commerce[]> {

    return this.httpClient.get<Commerce[]>(this.commerceUrl+'/');
  }

  getCommerceByVilleId(id: number): Observable<Commerce[]> {

    return this.httpClient.get<any>(this.commerceUrl+'/Ville/'+id)
    
  }

  getCommerceById(id: number): Observable<Commerce> {

    return this.httpClient.get<any>(this.commerceUrl+'/'+id)
    
  }

  createCommerce(commerce: Commerce): Observable<Commerce[]> {

    return this.httpClient.post<any>(this.commerceUrl, commerce);
    
  }

  updateCommerce(id: number, commerce: Commerce): Observable<Commerce[]> {

    return this.httpClient.put<any>(this.commerceUrl+'/'+id, commerce);
  }

  deleteCommerces(id: number): Observable<Commerce[]> {

    return this.httpClient.delete<any>(this.commerceUrl+'/'+id);
  }

}
