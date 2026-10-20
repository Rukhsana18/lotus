import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SPORTS_SIDEBAR_DATA, SidebarCategory } from '../../data/sports-sidebar.data';

@Component({
  imports: [RouterLink],
  selector: 'app-leagues',
  standalone: true,
  styleUrl: './leagues.scss',
  templateUrl: './leagues.html',
})
export class Leagues {
  @Input({ required: true }) sportRoute = '';

  protected get category(): SidebarCategory | undefined {
    return SPORTS_SIDEBAR_DATA.find(
      (item) => item.route === this.sportRoute && item.subLeagues?.length,
    );
  }

  protected leagueRoute(category: SidebarCategory, leagueId: string): string[] {
    return category.route === '/sports'
      ? [category.route, 'league', leagueId]
      : [category.route, leagueId];
  }
}
