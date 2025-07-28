import { Component, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { selectActivePrices, selectPricesLoading } from '../../core/states/selectors/pricing.selector';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { IPrice } from '../../shared/models/price.interface';
import { Store } from '@ngrx/store';
import { CommonModule, NgClass } from '@angular/common';
import { createPriceSuccess, deactivatePrice, deactivatePriceSuccess, getActivePrices } from '../../core/states/actions/pricing.action';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { ILink } from '../../shared/models/link.interface';
import { getActiveSubscription } from '../../core/states/actions/subscription.action';
import { selectActiveSubscription } from '../../core/states/selectors/subscription.selector';
import { ISubscription } from '../../shared/models/subscription.interface';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../shared/services/auth.service';
import { PricingCreateComponent } from '../pricing-create/pricing-create.component';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { ButtonComponent } from '../../components/button/button.component';
import { Actions } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tb-pricing',
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    BreadcrumbComponent,
    SpinnerComponent,
    TranslateModule,
    NgClass,
    PricingCreateComponent,
    DrawerComponent,
    ButtonComponent
],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly authService = inject(AuthService);
  private readonly destroy$ = new Subject<void>();
  private readonly action$ = inject(Actions);
  private readonly snackbar = inject(MatSnackBar);
  private readonly translate = inject(TranslateService);
  public activePrices$: Observable<IPrice[]> = of([]);
  public isLoading$: Observable<boolean> = this.store.select(selectPricesLoading);
  public activeSubscription: ISubscription | null = null;
  public selectedPeriod: string = 'month';
  public isPricingCreateFormOpen: boolean = false;
  public breadCrumbLinks: ILink[] = [
    { label: 'Home', url: '/app/home' },
    { label: 'Pricing', url: '', isActive: true },
  ];
  
  ngOnInit(): void {
    this.store.dispatch(getActivePrices({ recurring: this.selectedPeriod })); 
    this.store.dispatch(getActiveSubscription());
    this.store.select(selectActiveSubscription).subscribe((subscription) => {
      this.activeSubscription = subscription;
    });
    this.activePrices$ = this.store.select(selectActivePrices);
  }

  ngOnDestroy(): void {
    this.destroy$.next(); 
    this.destroy$.complete();
  }

  public checkActiveSubscription(priceId: string): boolean {
    return this.activeSubscription?.price?._id === priceId;
  }

  public setPeriod(period: string): void {
    this.selectedPeriod = period;
    this.store.dispatch(getActivePrices({ recurring: period }));
  }

  public get isUserOwner(): boolean {
    return this.authService.isUserOwner();
  }

  public closeForm(isClosed: boolean): void {
    this.isPricingCreateFormOpen = !isClosed;
  }

  public deactivatePrice(id: string): void {
    this.isPricingCreateFormOpen = false;
    this.store.dispatch(deactivatePrice({ id }));
  }

  public listenToActions(): void {
    this.action$
      .pipe(takeUntil(this.destroy$))
      .subscribe((action) => {
        switch (action.type) {
          case deactivatePriceSuccess.type:
            this.snackbar.open(this.translate.instant('PRICING.DEACTIVATE_PLAN_SUCCESS'), 'Close', {
              duration: 3000,
              panelClass: ['snackbar-success'],
            });
        }
      });
  }
}
