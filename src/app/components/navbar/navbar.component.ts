import { Component, inject, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../shared/services/flowbite.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { RouterModule } from '@angular/router';
import { IUser } from '../../shared/models/user.interface';
import { TranslateModule } from '@ngx-translate/core';
import { StringUtils } from '../../core/utils/string.utils';

@Component({
  selector: 'fb-navbar',
  standalone: true,
  imports: [
    RouterModule, 
    CommonModule,
    TranslateModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private readonly flowbiteService = inject(FlowbiteService);
  private readonly authService = inject(AuthService);
  public user: IUser | null = null;
  public userInitials: string | null = null;
  public userAvatarColor: string = '';
  public isDarkMode: boolean = localStorage.getItem('theme') === 'dark';

  
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(() => {
      initFlowbite();
    });
    this.user = this.authService.getUserFromLocalStorage();
    this.userInitials = StringUtils.setUserInitials(this.user?.fullname!);
  }

  public logout(): void {
    this.authService.logout();
  }

  public isOwner(): boolean {
    return this.authService.isUserOwner();
  }

  public toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
}
