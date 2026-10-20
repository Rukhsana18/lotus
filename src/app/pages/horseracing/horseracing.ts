import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { SportsHeader } from '../../shared/sports-header/sports-header';

@Component({
  imports: [SportsHeader],
  selector: 'app-horseracing',
  styleUrl: './horseracing.scss',
  templateUrl: './horseracing.html',
})
export class Horseracing {
  protected activeMainTab: 'live' | 'leagues' = 'live';

  constructor(private location: Location) {}

  protected goBack(): void {
    this.location.back();
  }

  protected setMainTab(tab: 'live' | 'leagues'): void {
    this.activeMainTab = tab;
  }
}
