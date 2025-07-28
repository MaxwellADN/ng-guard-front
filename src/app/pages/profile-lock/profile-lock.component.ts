import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { ButtonComponent } from "../../components/button/button.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'tb-profile-lock',
  imports: [ButtonComponent, TranslateModule],
  templateUrl: './profile-lock.component.html',
  styleUrl: './profile-lock.component.scss'
})
export class ProfileLockComponent {
  private readonly authService = inject(AuthService);

  public logout(): void {
    this.authService.logout();
  }
}
