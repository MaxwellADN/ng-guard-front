import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IUser } from '../../shared/models/user.interface';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { ILink } from '../../shared/models/link.interface';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { ISubscription } from '../../shared/models/subscription.interface';
import { Store } from '@ngrx/store';
import { selectActiveSubscription } from '../../core/states/selectors/subscription.selector';
import { cancelPayPalSubscription, cancelPayPalSubscriptionSuccess, cancelStripeSubscription, cancelStripeSubscriptionSuccess, getActiveSubscription } from '../../core/states/actions/subscription.action';
import { ButtonComponent } from '../../components/button/button.component';
import { CommonModule } from '@angular/common';
import { getUser, updateUser, updateUserEmail, updateUserSuccess } from '../../core/states/actions/user.action';
import { selectUser, selectUserLoading, selectUserError } from '../../core/states/selectors/user.selector';
import { ConfirmationButtonComponent } from '../../components/confirmation-button/confirmation-button.component';
import { Actions } from '@ngrx/effects';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Languages } from '../../core/constants/language.constant';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-account',
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    RouterLink,
    FormsModule, 
    BreadcrumbComponent,
    ButtonComponent,
    ConfirmationButtonComponent,
    TranslateModule
  ],
  standalone: true,
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit, OnDestroy {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly store = inject(Store);
  private readonly action$ = inject(Actions);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);
  private readonly destroy$ = new Subject<void>();
  private readonly authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private userId: string | null = null;
  public activeSubscription$: Observable<ISubscription | null> = this.store.select(selectActiveSubscription);
  public user$: Observable<IUser | null> = this.store.select(selectUser);
  public loading$: Observable<boolean> = this.store.select(selectUserLoading);
  public error$: Observable<string | null> = this.store.select(selectUserError);
  public user: IUser | null = null;
  public userProfileForm!: FormGroup;
  public languageForm!: FormGroup;
  public passwordForm!: FormGroup;
  public emailForm!: FormGroup;
  public breadCrumbLinks: ILink[] = [];
  public languageOptions: { label: string; code : string, active: boolean }[] = Languages.filter((lang) => lang.active);
  public isToastVisible: boolean = false;
  public toastMessage: string = '';
  public toastType: 'success' | 'error' = 'success';


  constructor() {
    this.initUserProfileForm();
    this.initLanguageForm();
    this.initEmailForm();
  }

  ngOnInit(): void {
    this.loadUserProfile();
    this.store.dispatch(getActiveSubscription());
    this.listenToActions();
    this.patchUserForms();
    this.initPasswordForm();
    this.breadCrumbLinks = [
      { label: this.translate.instant('ACCOUNT.BREADCRUMB.HOME'), url: '/app/home' },
      { label: this.translate.instant('ACCOUNT.BREADCRUMB.ACCOUNT'), url: '', isActive: true },
    ];
  }

  ngOnDestroy(): void {
    this.destroy$.next(); 
    this.destroy$.complete();
  }

  private patchUserForms(): void {
    this.user$.subscribe((user) => {
      if (user) {
        this.user = user;
        const address = user.addresses![0] || {};
        this.userProfileForm.patchValue({
          fullname: user.fullname,
          addressLine1: address.addressLine1,
          addressLine2: address.addressLine2,
          department: address.department,
          zipCode: address.zipCode,
          city: address.city,
          country: address.country,
          phoneNumber: address.phoneNumber,
          position: user.position || '',
          biography: user.biography || '',
        });
        this.languageForm.patchValue({
          language: user.language,
        });
        this.emailForm.patchValue({
          email: user.email,
        });
      }
    });
  }

  private initUserProfileForm(): void {
    this.userProfileForm = this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.minLength(3)]],
      addressLine1: ['', [Validators.required]],
      addressLine2: [''],
      department: [''],
      phoneNumber: [''],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      position: [''],
      biography: [''],
    });
  }

  private initLanguageForm(): void {
    this.languageForm = this.formBuilder.group({
      language: ['en', [Validators.required]],
    });
  }

  private initEmailForm(): void {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
    });
  }

  private initPasswordForm(): void {
    this.passwordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  private loadUserProfile(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      if (this.userId) {
        this.store.dispatch(getUser({ userId: this.userId }));
      }
    });
  }

  public getSubscriptionEndPeriodDate(createdAt: Date): Date {
    const date = new Date(createdAt);
    date.setMonth(date.getMonth() + 1);
    return date;
  }

  public onUserSave(): void {
    if (this.userProfileForm.invalid) {
      this.snackBar.open(this.translate.instant('ACCOUNT.REQUIRED_FIELDS'), 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error'],
      });
      return;
    }
    const updatedUser: IUser = {
      ...this.user!,
      id: this.userId,
      updatedAt: new Date(),
      fullname: this.userProfileForm.value.fullname,
      addresses: [
        {
          addressLine1: this.userProfileForm.value.addressLine1,
          addressLine2: this.userProfileForm.value.addressLine2,
          department: this.userProfileForm.value.department,
          zipCode: this.userProfileForm.value.zipCode,
          city: this.userProfileForm.value.city,
          country: this.userProfileForm.value.country,
          phoneNumber: this.userProfileForm.value.phoneNumber,
        },
      ],
      position: this.userProfileForm.value.position,
      biography: this.userProfileForm.value.biography,
    };
    if (this.userId) {
      this.store.dispatch(updateUser({ userId: this.userId, user: updatedUser }));
    }
  }

  public onLanguageSave(): void {
    if (this.languageForm.invalid) {
      this.snackBar.open(this.translate.instant('ACCOUNT.REQUIRED_FIELDS'), 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error'],
      });
      return;
    }
    try {
      const data = {...this.user!, language: this.languageForm.value.language};
      this.store.dispatch(updateUser({ userId: this.userId!, user: data }));
      localStorage.setItem('lang', this.languageForm.value.language);
      window.location.reload();
    } 
    catch (error) {
      this.snackBar.open(this.translate.instant('ACCOUNT.LANGUAGE_UPDATED_ERROR'), 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error'],
      });
      console.error('Error updating language:', error);
    }
  }

  public onPasswordSave(): void {
    if (this.passwordForm.invalid) {
      this.snackBar.open(this.translate.instant('ACCOUNT.REQUIRED_FIELDS'), 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error'],
      });
      return;
    }
    if (this.passwordForm.value.newPassword !== this.passwordForm.value.confirmPassword) {
      this.snackBar.open(this.translate.instant('ACCOUNT.PASSWORD_MISMATCH'), 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error'],
      });
      return;
    }
    if (this.userId) {
      this.authService.changePassword(this.passwordForm.value.newPassword, <string>localStorage.getItem('token')).subscribe({
        next: () => {
          this.snackBar.open(this.translate.instant('ACCOUNT.PASSWORD_UPDATED_SUCCESS'), 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success'],
          });
        },
        error: (error) => {
          this.snackBar.open(this.translate.instant('ACCOUNT.PASSWORD_UPDATED_ERROR'), 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error'],
          });
          console.error('Error updating password:', error);
        }
      });
    }
  }

  public onEmailSave(): void {
    if (this.emailForm.invalid) {
      this.snackBar.open(this.translate.instant('ACCOUNT.REQUIRED_FIELDS'), 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error'],
      });
      return;
    }
    if (this.emailForm.value.email !== this.emailForm.value.confirmEmail) {
      this.snackBar.open(this.translate.instant('ACCOUNT.EMAIL_MISMATCH'), 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error'],
      });
      return;
    }
    if (this.userId) {
      this.store.dispatch(updateUserEmail({ email: this.emailForm.value.email }));
    }
  }

  public cancelSubscription(): void {
    this.activeSubscription$
    .pipe(take(1))
    .subscribe((subscription) => {
      if (subscription?.stripeSubscriptionId) {
        this.store.dispatch(cancelStripeSubscription({ stripeSubscriptionId: subscription.stripeSubscriptionId }));
      }
      else if (subscription?.paypalAgreementId) {
        this.store.dispatch(cancelPayPalSubscription({ paypalAgreementId: subscription.paypalAgreementId }))
      }
    });
  }

  public listenToActions(): void {
    this.action$
      .pipe(takeUntil(this.destroy$))
      .subscribe((action) => {
        switch (action.type) {
          case cancelPayPalSubscriptionSuccess.type:
          case cancelStripeSubscriptionSuccess.type:
            this.snackBar.open(this.translate.instant('ACCOUNT.CANCEL_SUBSCRIPTION_SUCCESS'), 'Close', {
              duration: 3000,
              panelClass: ['snackbar-success'],
            });
            this.router.navigate(['/app/pricing']);
            break;
          case updateUserSuccess.type:
            this.snackBar.open(this.translate.instant('ACCOUNT.USER_SUCCESSFULLY_UPDATED'), 'Close', {
              duration: 3000,
              panelClass: ['snackbar-success'],
            });
            this.store.dispatch(getUser({ userId: this.userId! }));
            break;
        }
      });
  }
}