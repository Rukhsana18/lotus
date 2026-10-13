import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Betslip } from '../../layout/betslip/betslip';
import { Sidebar } from '../../layout/sidebar/sidebar';

interface SearchEvent {
  name: string;
  competition: string;
  time: string;
  icon: string;
  live?: boolean;
}

interface SearchGame {
  name: string;
  image: string;
}

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [RouterLink, Sidebar, Betslip],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class SearchPage {
  private readonly route = inject(ActivatedRoute);

  protected readonly casinoMode = toSignal(
    this.route.queryParamMap.pipe(map((params) => params.get('mode') === 'casino')),
    { initialValue: this.route.snapshot.queryParamMap.get('mode') === 'casino' },
  );

  protected readonly query = signal('');

  protected readonly providers = [
    { name: 'Evolution', count: 66, image: 'assets/icons/1.webp', route: 'evolution' },
    { name: 'Turbogames', count: 35, image: 'assets/icons/2.webp', route: 'turbogames' },
    { name: 'Mac88 Gaming', count: 29, image: 'assets/icons/3.webp', route: 'mac88' },
    { name: 'TopSpin Games', count: 26, image: 'assets/icons/4.webp', route: 'topspin' },
    { name: 'Ezugi', count: 25, image: 'assets/icons/5.webp', route: 'ezugi' },
  ];

  private readonly events: SearchEvent[] = [
    {
      name: 'Pakistan v Sri Lanka',
      competition: 'International Twenty20 Matches',
      time: 'Tomorrow 18:30',
      icon: 'icon-sport-cricket',
    },
    {
      name: 'Atalanta v Venezia',
      competition: 'Italian Serie A',
      time: 'Today 22:00',
      icon: 'icon-sport-football',
    },
    {
      name: 'Lehecka v Jodar',
      competition: 'ATP Shanghai 2026',
      time: 'In Play',
      icon: 'icon-sport-tennis',
      live: true,
    },
  ];

  private readonly games: SearchGame[] = [
    { name: 'Aviator', image: 'assets/1.webp' },
    { name: 'Roulette', image: 'assets/casino-games/1.webp' },
    { name: 'Speed Roulette', image: 'assets/casino-img/roulette2.webp' },
    { name: 'Auto Roulette', image: 'assets/casino-img/roulette1.webp' },
    { name: 'Dragon Tiger', image: 'assets/casino-games/2.webp' },
  ];

  protected readonly filteredEvents = computed(() => {
    const query = this.query().trim().toLocaleLowerCase();
    return this.events.filter((event) =>
      `${event.name} ${event.competition}`.toLocaleLowerCase().includes(query),
    );
  });

  protected readonly filteredGames = computed(() => {
    const query = this.query().trim().toLocaleLowerCase();
    return this.games.filter((game) =>
      game.name.toLocaleLowerCase().includes(query),
    );
  });

  protected updateQuery(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }
}
