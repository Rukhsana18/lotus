import { CommonModule, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { Footer } from '../../layout/footer/footer';
import { SportsLayout } from '../../layout/sports-layout/sports-layout';
import { SportsHeader } from '../../shared/sports-header/sports-header';
import { Leagues } from '../../shared/leagues/leagues';
import { LoginModal } from '../../shared/login-modal/login-modal';

interface OddItem {
  val: string;
  vol: string;
}

interface MatchEvent {
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

interface LeagueGroup {
  id: string;
  name: string;
  isLive?: boolean;
  isExpanded: boolean;
  events: MatchEvent[];
}

@Component({
  imports: [CommonModule, RouterOutlet, RouterLink, SportsLayout, Footer, SportsHeader, Leagues, LoginModal],
  selector: 'app-baseball',
  styleUrl: './baseball.scss',
  templateUrl: './baseball.html',
})
export class Baseball implements OnInit, OnDestroy {
  protected activeMainTab: 'live' | 'leagues' = 'leagues';
  protected activeFilter: 'all' | 'live' | 'popular' | 'upcoming' | 'virtual' = 'live';
  protected isChildRouteActive = false;

  private routeSub?: Subscription;

  protected leagueGroups: LeagueGroup[] = [
    {
      id: 'wimbledon',
      name: 'Wimbledon',
      isLive: true,
      isExpanded: true,
      events: [
        {
          id: 'player-one-vs-player-two',
          isPopular: true,
          isInPlay: true,
          teamOne: 'Player One',
          teamTwo: 'Player Two',
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
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.checkChildRoute(event.urlAfterRedirects);
      });
  }

  private checkChildRoute(url: string): void {
    const path = url.split(/[?#]/)[0];
    this.isChildRouteActive = path.startsWith('/baseball/');
  }

  protected goBack(): void {
    this.location.back();
  }

  protected setMainTab(tab: 'live' | 'leagues'): void {
    this.activeMainTab = tab;
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
