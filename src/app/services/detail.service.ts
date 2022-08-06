import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Detail } from '../common/detail';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  private detailUrl = 'http://localhost:8080/api/details/admin';
  //private detailUrl = 'http://progvcp-env.eba-ufqawf5p.us-east-1.elasticbeanstalk.com/api/details/admin';

  constructor(private httpClient: HttpClient) { }

  getDetailByProductId(id: number): Observable<Detail[]> {

    return this.httpClient.get<any>(this.detailUrl+'/product/'+id)
    
  }

  getDetailById(id: number): Observable<Detail> {

    return this.httpClient.get<any>(this.detailUrl+'/'+id)
    
  }

  createDetail(detail: Detail): Observable<Detail[]> {

    return this.httpClient.post<any>(this.detailUrl, detail);
    
  }

  updateDetail(id: number, detail: Detail): Observable<Detail[]> {

    return this.httpClient.put<any>(this.detailUrl+'/'+id, detail);
  }

  deleteDetail(id: number): Observable<Detail[]> {

    return this.httpClient.delete<any>(this.detailUrl+'/'+id);
  }

}
