import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPrice } from '../models/price.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class PriceService extends BaseService<IPrice> {
  
  constructor(http: HttpClient) {
    super(http, '/prices');
  }

  public createPrice(price: IPrice): Observable<IPrice> {
    return this.http.post<IPrice>(`${this.apiUrl}`, price, {
      headers: this.headers,
    });
  }

  public deactivatePrice(id: string): Observable<IPrice> {
    return this.http.post<IPrice>(`${this.apiUrl}/deactivate/${id}`, {}, {
      headers: this.headers,
    }); 
  }

  public getPrice(id: string): Observable<IPrice> {
    return this.http.get<IPrice>(`${this.apiUrl}/local/${id}`, {
      headers: this.headers,
    });
  }

  public getActivePrices(recurring: string): Observable<IPrice[]> {
    return this.http.get<IPrice[]>(`${this.apiUrl}/${recurring}/active`, {
      headers: this.headers,
    });
  }

  public getPrices(): Observable<IPrice[]> {
    return this.http.get<IPrice[]>(this.apiUrl, {
      headers: this.headers,
    });
  }
}