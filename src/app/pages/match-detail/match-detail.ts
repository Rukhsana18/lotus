import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Footer } from '../../layout/footer/footer';
import { BootstrapTooltipDirective } from '../../shared/bootstrap-tooltip.directive';

@Component({
  selector: 'app-match-detail',
  standalone: true,
  imports: [CommonModule, Footer, BootstrapTooltipDirective],
  templateUrl: './match-detail.html',
  styleUrl: './match-detail.scss',
})
export class MatchDetail implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('breadcrumb') private breadcrumb!: ElementRef<HTMLElement>;
  @ViewChild('breadcrumbTrack') private breadcrumbTrack!: ElementRef<HTMLElement>;

  private breadcrumbResizeObserver?: ResizeObserver;

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
      this.leagueId = params['leagueId'] || params['tennisId'] || params['footballId'];
      this.matchId = params['matchId'];
    });
  }

  ngAfterViewInit(): void {
    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    const updateBreadcrumbShift = (): void => {
      const containerWidth = this.breadcrumb.nativeElement.clientWidth;
      const textWidth = this.breadcrumbTrack.nativeElement.scrollWidth;
      const shift = containerWidth - textWidth;
      this.breadcrumbTrack.nativeElement.style.setProperty('--breadcrumb-shift', `${shift}px`);
    };

    this.breadcrumbResizeObserver = new ResizeObserver(updateBreadcrumbShift);
    this.breadcrumbResizeObserver.observe(this.breadcrumb.nativeElement);
    this.breadcrumbResizeObserver.observe(this.breadcrumbTrack.nativeElement);
    updateBreadcrumbShift();
  }

  ngOnDestroy(): void {
    this.breadcrumbResizeObserver?.disconnect();
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

}