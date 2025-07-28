import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from './shared/services/flowbite.service';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly translate = inject(TranslateService);
  private flowbiteService = inject(FlowbiteService);
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    this.translate.setDefaultLang(localStorage.getItem('lang') || 'en');
    this.translate.use(localStorage.getItem('lang') || 'en');
  }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(() => {
      initFlowbite();
    });
    this.addAppleScript();
    this.setTheme();
  }

  private addAppleScript(): void {
    if (isPlatformBrowser(this.platformId)) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js`;
      document.head.appendChild(script);
      script.onload = () => {
        console.log("Apple script loaded successfully.");
      };
      script.onerror = () => {
        console.error("Apple script failed to load.");
      };
    }
  }

  private setTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const theme = localStorage.getItem('theme');
      if (theme === 'dark' || (theme === null && prefersDarkScheme)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
}