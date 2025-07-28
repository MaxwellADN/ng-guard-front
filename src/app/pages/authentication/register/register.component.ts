import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../../shared/models/user.interface';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_SNACKBAR } from '../../../shared/constants/snackbar.constant';
import { CommonModule } from '@angular/common';
import { GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'tb-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    GoogleSigninButtonModule,
    TranslateModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly _matSnackBar = inject(MatSnackBar);
  private readonly socialAuthService = inject(SocialAuthService);
  private readonly translate = inject(TranslateService);
  public passwordMessage!: string;
  public validPassword: boolean = false;
  public registerForm: FormGroup;

  constructor() {
    this.registerForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      agreeWithTerms: [false, [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.initGoogleSignUpResponse();
  }

  private registerUser(user: IUser): void {
    this.authService.register(user).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        window.location.href = '/app/home';
      }, error: (error) => {
        if (error.status === 409) {
          this._matSnackBar.open(this.translate.instant('AUTH.SIGNUP.CONFLIT'), 'Close', {
            duration: MAT_SNACKBAR.duration,
            panelClass: ['snackbar-error'],
          });
        } else {
          this._matSnackBar.open(this.translate.instant('AUTH.SIGNUP.ERROR_SIGNUP'), 'Close', {
            duration: MAT_SNACKBAR.duration,
            panelClass: ['snackbar-error'],
          });
        }
      }
    });
  }

  private initGoogleSignUpResponse(): void {
    this.socialAuthService.authState.subscribe((user) => {
      const userData: IUser = {
        fullname: user.name,
        email: user.email,
        password: user.id,
        agreeWithTerms: true,
        emailVerified: true,
        id: null,
        role: null,
        createdAt: new Date(),
        updatedAt: null,
        rememberMe: null,
        createdBy: null,
        language: 'en',
      };
      this.registerUser(userData);
    }); 
  }

  public onSubmit(user: IUser): void {
    if (this.registerForm.invalid && this.validPassword === false) {
      this._matSnackBar.open(this.translate.instant('ACCOUNT.REQUIRED_FIELDS'), 'Close', {
        duration: MAT_SNACKBAR.duration,
        panelClass: ['snackbar-error'],
      });
      return;
    }
    if (user.agreeWithTerms === false) {
      this._matSnackBar.open(this.translate.instant('AUTH.SIGNUP.TERMS_AGREEMENT'), 'Close', {
        duration: MAT_SNACKBAR.duration,
        panelClass: ['snackbar-error'],
      });
      return;
    }
    this.registerUser(user);
  }

  public onKey(value: string): void {
    const hasNumber = /\d/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    if (value.length < 6) {
      this.passwordMessage = this.translate.instant('AUTH.SIGNUP.PASSWORD_MESSAGE');
      this.validPassword = false;
    } else if (!hasNumber) {
      this.passwordMessage = this.translate.instant('AUTH.SIGNUP.PASSWORD_NUMBER');
      this.validPassword = false;
    } else if (!hasUpperCase) {
      this.passwordMessage = this.translate.instant('AUTH.SIGNUP.PASSWORD_UPPERCASE');
      this.validPassword = false;
    } else if (!hasSpecialChar) {
      this.passwordMessage = this.translate.instant('AUTH.SIGNUP.PASSWORD_SPECIAL');
      this.validPassword = false;
    } else {
      this.passwordMessage = '';
      this.validPassword = true;
    }
  }
}
