import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Footer } from '../../layout/footer/footer';

@Component({
  selector: 'app-match-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, Footer],
  templateUrl: './match-detail.html',
  styleUrl: './match-detail.scss',
})
export class MatchDetail implements OnInit {
  @ViewChild('filterContainer') filterContainer!: ElementRef<HTMLDivElement>;

  leagueId = '';
  matchId = '';
  activeFilter = 'All';

  // State map tracking individual open/close accordion sections
  accordionStates: { [key: string]: boolean } = {
    schedule: true,
    matchOdds: true,
    bookmaker: true,
    fancy: true,
  };

  filters = [
    { label: 'All', count: null },
    { label: 'Main', count: 25 },
    { label: 'Exchange', count: 1 },
    { label: 'Fancy', count: 23 },
    { label: 'Innings & Sessions', count: 32 },
    { label: 'Player', count: 4 },
    { label: 'Balls & Wickets', count: null },
  ];

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.leagueId = params['leagueId'];
      this.matchId = params['matchId'];
    });
  }

  goBack(): void {
    this.location.back();
  }

  get isAllExpanded(): boolean {
    return Object.values(this.accordionStates).every((state) => state === true);
  }

  toggleAllAccordions(): void {
    const nextState = !this.isAllExpanded;
    Object.keys(this.accordionStates).forEach((key) => {
      this.accordionStates[key] = nextState;
    });
  }

  toggleSection(sectionKey: string): void {
    this.accordionStates[sectionKey] = !this.accordionStates[sectionKey];
  }

  setFilter(filterLabel: string): void {
    this.activeFilter = filterLabel;
    if (filterLabel === 'All') {
      this.toggleAllAccordions();
    }
  }

  // Scroll pill container to the right
  scrollRight(): void {
    if (this.filterContainer) {
      this.filterContainer.nativeElement.scrollBy({
        left: 200,
        behavior: 'smooth',
      });
    }
  }
}