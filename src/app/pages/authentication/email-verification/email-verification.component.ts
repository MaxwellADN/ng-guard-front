import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { timer } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-email-verification',
  imports: [TranslateModule],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.scss'
})
export class EmailVerificationComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private token = this.activatedRoute.snapshot.queryParamMap.get('token');
  
  ngOnInit(): void {
    timer(3000).subscribe(() => {
      this.authService.verifyEmail(this.token!).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/app/home']);
      }});
    });
  }
}
