import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { IUser } from '../../../shared/models/user.interface';
import { MAT_SNACKBAR } from '../../../shared/constants/snackbar.constant';
import { AuthService } from '../../../shared/services/auth.service';
import { GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'tb-login',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    GoogleSigninButtonModule,
    TranslateModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _matSnackBar = inject(MatSnackBar);
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly socialAuthService = inject(SocialAuthService);
  private readonly translate = inject(TranslateService);
  public loginForm!: FormGroup;

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required]],
      rememberMe: false
    });
    this.initGoogleSignInResponse();
  }

  public onSubmit(user: IUser): void {
    if (!this.loginForm.valid) {
      this._matSnackBar.open(this.translate.instant('ACCOUNT.REQUIRED_FIELDS'), 'Close', {
        duration: MAT_SNACKBAR.duration,
        panelClass: [MAT_SNACKBAR.panelClass.error],
      });
      return;
    } else {
      this.loginUser(user);
    }
  }

  private loginUser(user: IUser): void {
    this.authService.login(user).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        window.location.href = '/app/home';
      },
      error: (error) => {
        if (error.status === 401) {
          this._matSnackBar.open(this.translate.instant('ACCOUNT.INVALID_EMAIL'), 'Close', {
            duration: MAT_SNACKBAR.duration,
            panelClass: [MAT_SNACKBAR.panelClass.error],
          });
        } else {
          this._matSnackBar.open(this.translate.instant('AUTH.LOGIN.LOGIN_ERROR'), 'Close', {
            duration: MAT_SNACKBAR.duration,
            panelClass: [MAT_SNACKBAR.panelClass.error],
          });
        }
      }
    });
  }

  private initGoogleSignInResponse(): void {
    this.socialAuthService.authState.subscribe((user) => {
      const userData: IUser = {
        fullname: user.name,
        email: user.email,
        password: user.id,
        agreeWithTerms: true,
        emailVerified: true,
        id: null,
        role: null,
        createdAt: null,
        updatedAt: null,
        rememberMe: null,
        createdBy: null,
        language: 'en',
      };
      this.loginUser(userData);
    }); 
  }
}
