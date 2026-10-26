// import { Location } from '@angular/common';
// import { Component, inject, OnInit } from '@angular/core';
// import { Footer } from '../../layout/footer/footer';
// import { SportsHeader } from '../sports-header/sports-header';
// import { SportsLayout } from '../../layout/sports-layout/sports-layout';
// import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
// import { filter } from 'rxjs';

// @Component({
//   imports: [
//     Footer,
//     SportsLayout,
//     SportsHeader,
//     RouterOutlet // Ensure router-outlet is imported if used in template
//   ],
//   selector: 'app-general-settings',
//   styleUrl: './general-settings.scss',
//   templateUrl: './general-settings.html',
// })
// export class GeneralSettings implements OnInit {
//   private location = inject(Location);
//   private router = inject(Router);
  
//   subroutes: boolean = false;
//   subRouteName: string = '';

//   generalSettings = [
//     { setting: 'Security', link: '/general-settings/security' },
//     { setting: 'Betslip', link: '/general-settings/betslip' },
//     { setting: 'One Click Betting', link: '/general-settings/one-click-betting' },
//     { setting: 'Minute Market', link: '/general-settings/minute-market' },
//     { setting: 'Casino Stakes', link: '/general-settings/casino-stakes' },
//     { setting: 'Notification Center', link: '/general-settings/notification-center' }
//   ];

//   ngOnInit(): void {
//     // Check initial route on load
//     this.updateSubrouteState(this.router.url);

//     // Listen to subsequent route changes
//     this.router.events.pipe(
//       filter((event): event is NavigationEnd => event instanceof NavigationEnd)
//     ).subscribe((event) => {
//       this.updateSubrouteState(event.urlAfterRedirects);
//     });
//   }

//   private updateSubrouteState(url: string): void {
//     const matchedSetting = this.generalSettings.find(s => url.includes(s.link));
//     if (matchedSetting && url !== '/general-settings') {
//       this.subroutes = true;
//       this.subRouteName = matchedSetting.setting;
//     } else {
//       this.subroutes = false;
//       this.subRouteName = '';
//     }
//   }

//   protected goBack(): void {
//     this.location.back();
//   }

//   protected setMainTab(tab: 'live' | 'leagues'): void {
//     localStorage.setItem('tab', tab);
//     window.dispatchEvent(new Event('sports-tab-change'));
//   }

//   setRouterLink(value: any) {
//     this.router.navigate([value.link]);
//   }
// }

import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Footer } from '../../layout/footer/footer';
import { SportsHeader } from '../sports-header/sports-header';
import { SportsLayout } from '../../layout/sports-layout/sports-layout';
import { Router, NavigationEnd, RouterOutlet, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  imports: [
    Footer,
    SportsLayout,
    SportsHeader,
    RouterOutlet,
    RouterLink // Added RouterLink to support native routing tags
  ],
  selector: 'app-general-settings',
  styleUrl: './general-settings.scss',
  templateUrl: './general-settings.html',
})
export class GeneralSettings implements OnInit {
  private location = inject(Location);
  private router = inject(Router);
  
  subroutes: boolean = false;
  subRouteName: string = '';

  generalSettings = [
    { setting: 'Security', link: '/general-settings/security' },
    { setting: 'Betslip', link: '/general-settings/betslip' },
    { setting: 'One Click Betting', link: '/general-settings/one-click-betting' },
    { setting: 'Minute Market', link: '/general-settings/minute-market' },
    { setting: 'Casino Stakes', link: '/general-settings/casino-stakes' },
    { setting: 'Notification Center', link: '/general-settings/notification-center' }
  ];

  ngOnInit(): void {
    // Check initial route on load
    this.updateSubrouteState(this.router.url);

    // Listen to subsequent route changes
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.updateSubrouteState(event.urlAfterRedirects);
    });
  }

  private updateSubrouteState(url: string): void {
    const matchedSetting = this.generalSettings.find(s => url.includes(s.link));
    if (matchedSetting && url !== '/general-settings') {
      this.subroutes = true;
      this.subRouteName = matchedSetting.setting;
    } else {
      this.subroutes = false;
      this.subRouteName = '';
    }
  }

  protected goBack(): void {
    this.location.back();
  }

  protected navigateToGeneralSettings(): void {
    this.router.navigate(['/general-settings']);
  }

  protected setMainTab(tab: 'live' | 'leagues'): void {
    localStorage.setItem('tab', tab);
    window.dispatchEvent(new Event('sports-tab-change'));
  }
}