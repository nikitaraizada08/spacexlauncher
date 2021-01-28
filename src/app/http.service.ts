import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private configUrl = 'https://api.spacexdata.com/v3/launches?limit=100';
  constructor(private http: HttpClient) {
   }
   getResponse(): Observable<any>{
       return this.http.get(this.configUrl);
   }
}
