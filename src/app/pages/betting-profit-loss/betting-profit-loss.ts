import { Component, inject } from '@angular/core';
import { SportsLayout } from '../../layout/sports-layout/sports-layout';
import { SportsHeader } from '../../shared/sports-header/sports-header';
import { Footer } from '../../layout/footer/footer';
import { Location } from '@angular/common';

@Component({
  imports: [
    SportsLayout,
    SportsHeader,
    Footer
  ],
  selector: 'app-betting-profit-loss',
  styleUrl: './betting-profit-loss.scss',
  templateUrl: './betting-profit-loss.html',
})
export class BettingProfitLoss {
  private location = inject(Location);

  protected goBack(): void {
    this.location.back();
  }

}
