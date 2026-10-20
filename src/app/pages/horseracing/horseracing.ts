import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { Betslip } from '../../layout/betslip/betslip';
import { Footer } from '../../layout/footer/footer';
import { SportsHeader } from '../../shared/sports-header/sports-header';
import { Leagues } from '../../shared/leagues/leagues';

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
  imports: [CommonModule, RouterOutlet, RouterLink, Sidebar,
    Footer, Betslip, SportsHeader, Leagues],
  selector: 'app-horseracing',
  styleUrl: './horseracing.scss',
  templateUrl: './horseracing.html',
})
export class Horseracing  implements OnInit, OnDestroy {
  protected activeMainTab: 'live' | 'leagues' = 'leagues';
  protected activeFilter: 'all' | 'live' | 'popular' | 'upcoming' | 'virtual' = 'live';
  protected isChildRouteActive = false;

  private routeSub?: Subscription;

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

  constructor(private router: Router, private location: Location) { }

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
    this.isChildRouteActive = path.startsWith('/horseracing/');
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
