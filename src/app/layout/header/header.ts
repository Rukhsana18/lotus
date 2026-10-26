import { Component, computed, inject, output, signal } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, interval, map, startWith } from 'rxjs';
import { SPORTS_SIDEBAR_DATA } from '../../data/sports-sidebar.data';
import { LoginModal } from '../../shared/login-modal/login-modal';
import { Notification } from '../../shared/notification/notification';

@Component({
  imports: [DatePipe, RouterLink, RouterLinkActive, LoginModal,
    Notification
  ],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  readonly mobileMenuOpenChange = output<boolean>();
  protected mobileMenuOpen = false;
  protected readonly sportsCategories = SPORTS_SIDEBAR_DATA;
  protected readonly isLoggedIn = signal<boolean>(localStorage.getItem('isLoggedIn') === 'true');

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  protected readonly isCasinoRoute = computed(() => {
    const [path, query = ''] = this.currentUrl().split('?');
    return path.startsWith('/casino') || new URLSearchParams(query).get('mode') === 'casino';
  });

  protected readonly isSportsRoute = computed(() => this.currentUrl().startsWith('/sports'));

  protected readonly currentDate = new Date();

  protected readonly currentTime = toSignal(
    interval(1000).pipe(map(() => new Date())),
    { initialValue: new Date() }
  );

  protected goBack(): void {
    this.location.back();
  }

  protected toggleProfileDrawer(): void {
    // Implement your profile side drawer toggle behavior here
    console.log('Profile side drawer toggled');
  }
}