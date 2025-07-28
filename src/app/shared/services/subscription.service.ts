import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISubscription } from '../models/subscription.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService extends BaseService<ISubscription> {

  constructor(http: HttpClient) {
    super(http, '/subscriptions');
  }

  public createStripeSubscription(stripePriceId: string): Observable<any> {
    const url = `${this.apiUrl}/stripe/create`;
    return this.http.post(url, { stripePriceId }, {
      headers: this.headers,
    });
  }

  public updateStripeSubscription(stripeSubscriptionId: string, newStripePriceId: string): Observable<ISubscription> {
    const url = `${this.apiUrl}/stripe/update`;
    return this.http.put<ISubscription>(url, { stripeSubscriptionId, newStripePriceId }, {
      headers: this.headers,
    });
  }

  public cancelStripeSubscription(stripeSubscriptionId: string): Observable<ISubscription> {
    const url = `${this.apiUrl}/stripe/cancel`;
    return this.http.put<ISubscription>(url, { stripeSubscriptionId }, {
      headers: this.headers,
    });
  }

  public updatePayPalSubscription(paypalAgreementId: string, newPaypalPriceId: string): Observable<ISubscription> {
    const url = `${this.apiUrl}/paypal/update`;
    return this.http.put<ISubscription>(url, { paypalAgreementId, newPaypalPriceId }, {
      headers: this.headers,
    });
  }

  public cancelPayPalSubscription(paypalAgreementId: string): Observable<ISubscription> {
    const url = `${this.apiUrl}/paypal/cancel`;
    return this.http.put<ISubscription>(url, { paypalAgreementId }, {
      headers: this.headers,
    });
  }

  public getActiveSubscription(): Observable<ISubscription> {
    const url = `${this.apiUrl}/active`;
    return this.http.get<ISubscription>(url, {
      headers: this.headers,
    });
  }
}