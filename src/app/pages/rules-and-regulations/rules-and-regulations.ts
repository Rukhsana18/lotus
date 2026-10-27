import { Component, inject } from '@angular/core';
import { SportsLayout } from '../../layout/sports-layout/sports-layout';
import { SportsHeader } from '../../shared/sports-header/sports-header';
import { Footer } from '../../layout/footer/footer';
import { Location } from '@angular/common';

@Component({
  imports: [SportsLayout,
    SportsHeader,
    Footer],
  selector: 'app-rules-and-regulations',
  styleUrl: './rules-and-regulations.scss',
  templateUrl: './rules-and-regulations.html',
})
export class RulesAndRegulations {
  private location = inject(Location);

  protected goBack(): void {
    this.location.back();
  }
}
