import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CURRENCIES } from '../../core/constants/currencies.constant';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { createPrice, createPriceSuccess, getActivePrices } from '../../core/states/actions/pricing.action';
import { Actions } from '@ngrx/effects';
import { Subject, takeUntil } from 'rxjs';
import { ButtonComponent } from '../../components/button/button.component';
import { IPrice } from '../../shared/models/price.interface';

@Component({
  selector: 'tb-pricing-create',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ButtonComponent
  ],
  templateUrl: './pricing-create.component.html',
  styleUrl: './pricing-create.component.scss'
})
export class PricingCreateComponent implements OnInit {
  @Output() public closeForm = new EventEmitter<boolean>();
  @Input({ required: true }) public selectedPeriod: string = 'month';
  private readonly fb = inject(FormBuilder);
  private readonly snackbar = inject(MatSnackBar);
  private readonly store = inject(Store);
  private readonly action$ = inject(Actions);
  private readonly destroy$ = new Subject<void>();
  private readonly translate = inject(TranslateService);
  public currencies: { label: string; code: string, active: boolean }[] = CURRENCIES;
  public pricingForm: FormGroup;

  constructor() {
    this.pricingForm = this.fb.group({
      title: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
      currency: ['USD', [Validators.required]],
      recurring: this.fb.group({
        interval: ['month', [Validators.required]],
      })
    });
  }

  ngOnInit(): void {
    this.listenToActions();
  }

  onSubmit(): void {
    if (!this.pricingForm.valid) {
      this.snackbar.open(this.translate.instant('ACCOUNT.REQUIRED_FIELDS'), 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error'],
      });
      return;
    }
    const price: IPrice = this.pricingForm.value;
    this.store.dispatch(createPrice({ price }));
  }

  public listenToActions(): void {
    this.action$
      .pipe(takeUntil(this.destroy$))
      .subscribe((action) => {
        switch (action.type) {
          case createPriceSuccess.type:
            this.snackbar.open(this.translate.instant('PRICING_CREATE.CREATE_PLAN_SUCCESS'), 'Close', {
              duration: 3000,
              panelClass: ['snackbar-success'],
            });
          this.store.dispatch(getActivePrices({ recurring: this.selectedPeriod }));

            this.closeForm.emit(true);
            break;
        }
      });
  }
}
