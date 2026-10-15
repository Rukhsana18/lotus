import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet, RouterLink, ActivatedRoute } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { Betslip } from '../../layout/betslip/betslip';
import { Footer } from '../../layout/footer/footer';

export interface LeagueListItem {
  id: string;
  name: string;
  matchCount: number;
  isVirtual?: boolean;
}

export interface OddItem {
  val: string;
  vol: string;
}

export interface MatchEvent {
  id: string;
  isPopular?: boolean;
  isInPlay?: boolean;
  teamOne: string;
  teamTwo: string;
  teamOneLogo?: string;
  teamTwoLogo?: string;
  odds: OddItem[];
  extraMarkets: string;
}

export interface LeagueGroup {
  id: string;
  name: string;
  isLive?: boolean;
  isExpanded: boolean;
  events: MatchEvent[];
}

@Component({
  selector: 'app-sports',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, Sidebar,
    Footer, Betslip],
  templateUrl: './sports.html',
  styleUrl: './sports.scss',
})
export class Sports implements OnInit, OnDestroy {
  protected activeMainTab: 'live' | 'leagues' = 'leagues';
  protected activeFilter: 'all' | 'live' | 'popular' | 'upcoming' | 'virtual' = 'live';
  protected isChildRouteActive = false;

  private routeSub?: Subscription;

  protected leagueList: LeagueListItem[] = [
    { id: '1', name: 'International Twenty20 Matches', matchCount: 1 },
    { id: '2', name: 'One Day Internationals', matchCount: 1 },
    { id: '3', name: 'Test Matches', matchCount: 1 },
    { id: '4', name: 'Womens International Twenty20 Matches', matchCount: 1 },
    { id: '5', name: 'South Africa T20 Challenge', matchCount: 5 },
    { id: '6', name: 'World Championship of Legends T20', matchCount: 1 },
    { id: '7', name: 'Quantum Cricket League', matchCount: 6, isVirtual: true },
  ];

  protected leagueGroups: LeagueGroup[] = [
    {
      id: 'wcl-t20',
      name: 'World Championship of Legends T20',
      isLive: true,
      isExpanded: true,
      events: [
        {
          id: 'eng-vs-aus',
          isPopular: true,
          isInPlay: true,
          teamOne: 'England Legends',
          teamTwo: 'Australia Legends',
          teamOneLogo: 'assets/teams/england.png',
          teamTwoLogo: 'assets/teams/australia.png',
          odds: [
            { val: '1.67', vol: '5,775' },
            { val: '1.68', vol: '54,702' },
            { val: '2.48', vol: '925' },
            { val: '2.50', vol: '9,060' },
          ],
          extraMarkets: '+51',
        },
      ],
    },
  ];

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.checkChildRoute(this.router.url);

    this.routeSub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.checkChildRoute(event.urlAfterRedirects);
      });
  }

  private checkChildRoute(url: string): void {
    const path = url.split(/[?#]/)[0];
    // Check if user is navigating deeper into /sports/league/...
    this.isChildRouteActive = path.includes('/sports/league/');
  }

  protected goBack(): void {
    this.location.back();
  }

  protected setMainTab(tab: 'live' | 'leagues'): void {
    this.activeMainTab = tab;
    localStorage.setItem('tab', tab);
    window.dispatchEvent(new Event('sports-tab-change'));
  }

  protected setFilter(filter: 'all' | 'live' | 'popular' | 'upcoming' | 'virtual'): void {
    this.activeFilter = filter;
  }

  protected toggleLeague(league: LeagueGroup): void {
    league.isExpanded = !league.isExpanded;
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }
}