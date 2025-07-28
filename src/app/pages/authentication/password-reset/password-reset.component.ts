import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IUser } from '../../../shared/models/user.interface';
import { MAT_SNACKBAR } from '../../../shared/constants/snackbar.constant';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'tb-password-reset',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule
  ],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent {
  private readonly _matSnackBar = inject(MatSnackBar);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly translate = inject(TranslateService);
  public passwordResetForm!: FormGroup;

  constructor() {
    this.initPasswordResetForm();
  }
  private initPasswordResetForm(): void {
    this.passwordResetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public onSubmit(user: IUser): void { 
    if (!this.passwordResetForm.valid) {
      this._matSnackBar.open(this.translate.instant('ACCOUNT.REQUIRED_FIELDS'), 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error'],
      });
      return;
    }
    this.authService.passwordReset(user.email).subscribe({
      next: () => {
        this._matSnackBar.open(this.translate.instant('AUTH.RESET_PASSWORD.EMAIL_SENT'), 'Close', {
          duration: MAT_SNACKBAR.duration,
          panelClass: MAT_SNACKBAR.panelClass.success,
        });
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this._matSnackBar.open(this.translate.instant('AUTH.RESET_PASSWORD.EMAIL_SENT_ERROR'), 'Close', {
          duration: MAT_SNACKBAR.duration,
          panelClass: MAT_SNACKBAR.panelClass.error,
        });
      }
    });
  }
}
