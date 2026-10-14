import { Component, HostListener, computed, inject, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, interval, map, startWith } from 'rxjs';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  imports: [DatePipe, RouterLink, RouterLinkActive, Sidebar],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  private readonly router = inject(Router);

  readonly mobileMenuOpenChange = output<boolean>();

  protected mobileMenuOpen = false;

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

  protected readonly currentDate = new Date();

  protected readonly currentTime = toSignal(
    interval(1000).pipe(map(() => new Date())),
    { initialValue: new Date() }
  );

  protected toggleMobileMenu(): void {
    this.setMobileMenuOpen(!this.mobileMenuOpen);
  }

  protected closeMobileMenu(): void {
    this.setMobileMenuOpen(false);
  }

  private setMobileMenuOpen(isOpen: boolean): void {
    this.mobileMenuOpen = isOpen;
    this.mobileMenuOpenChange.emit(isOpen);
  }

  @HostListener('document:keydown.escape')
  protected closeMobileMenuOnEscape(): void {
    this.closeMobileMenu();
  }
}
