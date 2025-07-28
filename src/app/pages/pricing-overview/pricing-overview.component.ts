import { Component, inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { IPrice } from '../../shared/models/price.interface';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectPriceById, selectPricesLoading } from '../../core/states/selectors/pricing.selector';
import { getPrice } from '../../core/states/actions/pricing.action';
import { createStripeSubscription, getActiveSubscription, updatePayPalSubscription, updatePayPalSubscriptionFailure, updatePayPalSubscriptionSuccess, updateStripeSubscription, updateStripeSubscriptionFailure, updateStripeSubscriptionSuccess } from '../../core/states/actions/subscription.action';
import { ButtonComponent } from '../../components/button/button.component';
import { selectActiveSubscription, selectCheckoutSession } from '../../core/states/selectors/subscription.selector';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { environment } from '../../../environments/environment.development';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { AuthService } from '../../shared/services/auth.service';
import { ILink } from '../../shared/models/link.interface';
import { Actions } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
declare var paypal: any;

@Component({
  selector: 'app-pricing-overview',
  standalone: true,
  imports: [
    CommonModule, 
    ButtonComponent, 
    BreadcrumbComponent,
    SpinnerComponent,
    TranslateModule,
  ],
  templateUrl: './pricing-overview.component.html',
  styleUrls: ['./pricing-overview.component.scss'],
})
export class PricingOverviewComponent implements OnInit, OnDestroy {
  @ViewChild('paypal') public paypalElement: any;
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);
  private readonly authService = inject(AuthService); 
  private readonly router = inject(Router);
  private readonly action$ = inject(Actions);
  private readonly destroy$ = new Subject<void>();
  private readonly platformId = inject(PLATFORM_ID);
  private readonly translate = inject(TranslateService);
  private matSnackBar = inject(MatSnackBar);
  public pricing$!: Observable<IPrice | null>;
  public isStripeSubscribing: boolean = false;
  public isPayPalSubscribing: boolean = false;
  public isLoading: boolean = true;
  public isPriceLoading$ = this.store.select(selectPricesLoading);
  public activeSubscription$ = this.store.select(selectActiveSubscription);
  public breadCrumbLinks: ILink[] = [
    { label: 'Home', url: '/app/home' },
    { label: 'Pricing', url: '/app/pricing' },
    { label: 'Overview', url: '', isActive: true },
  ];

  ngOnInit(): void {
    const priceId: string = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(getPrice({ id: priceId }));
    this.store.dispatch(getActiveSubscription());
    this.pricing$ = this.store.select(selectPriceById);
    this.pricing$.subscribe((price) => {
      const subscriberEmail = this.authService.getUserFromLocalStorage()?.email;
      this.addPayPalScript(price!, subscriberEmail!);
    });
    this.listenForStripeCheckoutSession();
    this.listenForActionResults();
  }

  ngOnDestroy(): void {
    this.destroy$.next(); 
    this.destroy$.complete();
  }

  public subscribeWithStripe(stripePriceId: string): void {
    this.isStripeSubscribing = true;
    this.activeSubscription$
    .pipe(take(1))
    .subscribe((subscription) => {
      if (subscription?.stripeSubscriptionId) {
        this.store.dispatch(updateStripeSubscription({ stripeSubscriptionId: subscription?.stripeSubscriptionId, stripePriceId }));
      } else {
        this.store.dispatch(createStripeSubscription({ stripePriceId }));
      }
    });
  }

  public updatePayPalSubscription(paypalPriceId: string): void {
    this.isPayPalSubscribing = true;
    this.activeSubscription$
    .pipe(take(1))
    .subscribe((subscription) => {
      if (subscription?.paypalAgreementId) {
        this.store.dispatch(updatePayPalSubscription({ paypalAgreementId: subscription?.paypalAgreementId, newPaypalPlanId: paypalPriceId }));
      }
    });
  }

  private listenForStripeCheckoutSession(): void {
    this.store.select(selectCheckoutSession).subscribe((session) => {
      if (session) {
        window.location.href = session.url;
      }
    });
  }

  private listenForActionResults(): void {
    this.action$
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (action) => {
        switch (action.type) {
          case updateStripeSubscriptionSuccess.type:
            this.isStripeSubscribing = false;
            this.router.navigate(['/app/subscription/success']);
            break;
          case updateStripeSubscriptionFailure.type:
            this.isStripeSubscribing = false;
            this.matSnackBar.open(this.translate.instant('PRICING_OVERVIEW.UPDATE_SUBSCRIPTION_FAILED'), 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar'],
            });
            break;
          case updatePayPalSubscriptionSuccess.type:
            this.isStripeSubscribing = false;
            this.router.navigate(['/app/subscription/success']);
            break;
          case updatePayPalSubscriptionFailure.type:
            this.isStripeSubscribing = false;
            this.matSnackBar.open(this.translate.instant('PRICING_OVERVIEW.UPDATE_SUBSCRIPTION_FAILED'), 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar'],
            });
            break;
        }
      },
      error: (err) => {
        console.error('Error in subscription update:', err);
        this.isStripeSubscribing = false;
        this.isPayPalSubscribing = false;
      }
    });
  }

  private initPayPalSubscriptionButton(price: IPrice, subscriberEmail: string): void {
    if (this.paypalElement != undefined) {
      if (price) {
        paypal.Buttons({
          createSubscription: (_: any, actions: any) => {
            return actions.subscription.create({
              'plan_id': price.paypalPriceId,
              'custom_id': subscriberEmail
            });
          },
          onApprove: (_: any, actions: any) => {
            window.location.href = '/app/subscription/success';
            return actions.subscription.activate();
          }
        }).render(this.paypalElement?.nativeElement!)
          .then(() => {
            this.isLoading = false; 
          })
          .catch((error: any) => {
            console.error("PayPal button rendering failed:", error);
            this.isLoading = false;
          });
      } else {
        this.isLoading = false; 
      }
    } else {
      this.isLoading = false;
    }
  }

  private addPayPalScript(price: IPrice, subscriberEmail: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?&client-id=${environment.paypalClientId}&vault=true&intent=subscription`;
      document.head.appendChild(script);
      script.onload = () => {
        console.log("PayPal SDK loaded successfully.");
        this.initPayPalSubscriptionButton(price, subscriberEmail);
      };
      script.onerror = () => {
        console.error("PayPal SDK failed to load.");
        this.isLoading = false;
      };
    }
  }
}