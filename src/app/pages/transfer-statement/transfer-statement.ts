import { Component, inject } from '@angular/core';
import { SportsLayout } from '../../layout/sports-layout/sports-layout';
import { SportsHeader } from '../../shared/sports-header/sports-header';
import { Footer } from '../../layout/footer/footer';
import { Location } from '@angular/common';
import { Auth } from '../../services/auth';

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
  private auth = inject(Auth);
  transferStatement: any;

  protected goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getTransferStatements();
  }

  getTransferStatements() {
    this.auth.getTransferStatements().subscribe((res: any) => { 
      this.transferStatement = res;
    })
  }
}
