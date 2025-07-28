import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { MAT_SNACKBAR } from '../../../shared/constants/snackbar.constant';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'tb-change-password',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  private readonly _matSnackBar = inject(MatSnackBar);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly translate = inject(TranslateService);
  public passwordForm!: FormGroup;

  constructor() {
    this.initPasswordForm();
  }

  private initPasswordForm(): void {
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  public onSubmit(): void {
    if (!this.passwordForm.valid) {
      this._matSnackBar.open(this.translate.instant('ACCOUNT.REQUIRED_FIELDS'), 'Close', {
        duration: MAT_SNACKBAR.duration,
        panelClass: ['snackbar-error'],
      });
      return;
    }
    if (this.passwordForm.value.password !== this.passwordForm.value.confirmPassword) {
      this._matSnackBar.open(this.translate.instant('ACCOUNT.PASSWORD_MISMATCH'), 'Close', {
        duration: MAT_SNACKBAR.duration,
        panelClass: ['snackbar-error'],
      });
      return;
    }
    const token = this.activatedRoute.snapshot.queryParams['token'];
    this.authService.changePassword(this.passwordForm.value.password, token).subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
        this._matSnackBar.open(this.translate.instant('ACCOUNT.PASSWORD_UPDATED_SUCCESS'), 'Close', {
          duration: MAT_SNACKBAR.duration,
          panelClass: ['snackbar-success'],
        });
      },
      error: () => {
        this._matSnackBar.open(this.translate.instant('ACCOUNT.PASSWORD_UPDATED_ERROR'), 'Close', {
          duration: MAT_SNACKBAR.duration,
          panelClass: ['snackbar-error'],
        });
      }
    });
  }
}
