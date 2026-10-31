import { Component, computed, inject, output, signal } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, interval, map, startWith } from 'rxjs';
import { SPORTS_SIDEBAR_DATA } from '../../data/sports-sidebar.data';
import { LoginModal } from '../../shared/login-modal/login-modal';
import { Notification } from '../../shared/notification/notification';
import { Profile } from '../../shared/profile/profile';
import { Auth } from '../../services/auth';

@Component({
  imports: [DatePipe, RouterLink, RouterLinkActive, LoginModal,
    Notification,
    Profile
  ],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  profile: any = JSON.parse(localStorage.getItem('user') || '{}');

  readonly mobileMenuOpenChange = output<boolean>();
  protected mobileMenuOpen = false;
  protected readonly sportsCategories = SPORTS_SIDEBAR_DATA;
  protected readonly isLoggedIn = signal<boolean>(localStorage.getItem('isLoggedIn') === 'true');

  deviceOffset: string = '+05:30';
  selectedTimezoneLabel: string = '+05:30';
  selectedOffsetValue = signal<string>('+05:30');

  ngOnInit() {
    console.log(this.profile)
    if (this.isLoggedIn()) {
      this.getHeader();
    }
    this.calculateSystemTimezone();
  }

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

  private auth = inject(Auth);

  getHeader() {
    this.auth.getHeaderName().subscribe((res: any) => {
      console.log(res)
    })
  }

  private calculateSystemTimezone(): void {
    // Get timezone offset in minutes (e.g., -330 for IST)
    const offsetMinutes = new Date().getTimezoneOffset();
    const absMinutes = Math.abs(offsetMinutes);
    const hours = String(Math.floor(absMinutes / 60)).padStart(2, '0');
    const minutes = String(absMinutes % 60).padStart(2, '0');
    
    // JavaScript getTimezoneOffset() returns inverse sign (negative for ahead of UTC)
    const sign = offsetMinutes <= 0 ? '+' : '-';
    this.deviceOffset = `${sign}${hours}:${minutes}`;

    // Preselect device time by default
    this.selectedTimezoneLabel = this.deviceOffset;
    this.selectedOffsetValue.set(this.deviceOffset);
  }

  selectTimezone(label: string, offset: string): void {
    this.selectedTimezoneLabel = offset; // Updates top button to show e.g. "+05:30"
    this.selectedOffsetValue.set(offset);
    // You can save preference to localStorage if needed
    localStorage.setItem('selectedTimezone', offset);
  }
}