import { Component, inject } from '@angular/core';
import { SportsLayout } from '../../layout/sports-layout/sports-layout';
import { SportsHeader } from '../../shared/sports-header/sports-header';
import { Footer } from '../../layout/footer/footer';
import { Location } from '@angular/common';

@Component({
  imports: [SportsLayout,
    SportsHeader,
    Footer],
  selector: 'app-transfer-statement',
  styleUrl: './transfer-statement.scss',
  templateUrl: './transfer-statement.html',
})
export class TransferStatement {
  private location = inject(Location);

  protected goBack(): void {
    this.location.back();
  }
}
