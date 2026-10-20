import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { Footer } from '../../layout/footer/footer';

@Component({
  selector: 'app-virtual-games',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, Sidebar, Footer],
  templateUrl: './virtual-games.html',
  styleUrl: './virtual-games.scss',
})
export class VirtualGames implements OnInit, OnDestroy {
  private readonly location = inject(Location);
  private readonly router = inject(Router);
  private routeSub?: Subscription;

  protected isChildRouteActive = false;

  ngOnInit(): void {
    this.checkChildRoute(this.router.url);

    this.routeSub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.checkChildRoute(event.urlAfterRedirects));
  }

  protected goBack(): void {
    this.location.back();
  }

  private checkChildRoute(url: string): void {
    const cleanUrl = url.split(/[?#]/)[0].replace(/\/$/, '');
    this.isChildRouteActive = cleanUrl !== '/virtual';
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }
}