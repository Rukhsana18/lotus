import {
  afterNextRender,
  Component,
  OnDestroy,
  OnInit,
  signal
} from '@angular/core';
import {
  Router,
  NavigationEnd,
  RouterLink,
  RouterLinkActive
} from '@angular/router';
import { filter, Subscription } from 'rxjs';
import {
  SPORTS_SIDEBAR_DATA,
  SidebarCategory
} from '../../data/sports-sidebar.data';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar implements OnInit, OnDestroy {
  isSportsRoute = false;
  isHomeRoute = false;
  isLeagueTabActive = false;

  categories: SidebarCategory[] = SPORTS_SIDEBAR_DATA;

  expandedCategoryMap: { [key: string]: boolean } = {
    cricket: true
  };

  protected readonly showCricketDropdown = signal(false);

  private routerSubscription?: Subscription;
  private tabChangeListener?: () => void;

  constructor(private router: Router) {
    afterNextRender(() => {
      this.syncTabState();

      // Listen for tab change events emitted by sports page
      this.tabChangeListener = () => this.syncTabState();
      window.addEventListener('sports-tab-change', this.tabChangeListener);
    });
  }

  ngOnInit(): void {
    this.updateRouteState(this.router.url);

    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateRouteState(event.urlAfterRedirects);
      });
  }

  private syncTabState(): void {
    const activeTab = localStorage.getItem('tab');
    const isLiveTab = activeTab === 'live';

    this.showCricketDropdown.set(isLiveTab);
    this.expandedCategoryMap['cricket'] = isLiveTab;
  }

  private updateRouteState(url: string): void {
    const path = url.split(/[?#]/)[0];

    this.isSportsRoute = path === '/sports' || path.startsWith('/sports/');
    this.isHomeRoute = path === '/' || path === '/home';
    this.isLeagueTabActive = path.includes('/league/') || url.includes('tab=leagues');
  }

  toggleCategory(categoryId: string, event: Event): void {
    if (categoryId !== 'cricket' || !this.isSportsRoute) {
      return;
    }

    event.preventDefault();

    if (localStorage.getItem('tab') !== 'live') {
      this.expandedCategoryMap['cricket'] = false;
      this.showCricketDropdown.set(false);
      return;
    }

    this.showCricketDropdown.set(true);
    this.expandedCategoryMap[categoryId] = !this.expandedCategoryMap[categoryId];
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    if (this.tabChangeListener) {
      window.removeEventListener('sports-tab-change', this.tabChangeListener);
    }
  }
}