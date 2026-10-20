import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Footer } from '../../../layout/footer/footer';
import { Betslip } from '../../../layout/betslip/betslip';

export interface VirtualMatchItem {
  id: string;
  team1: string;
  team1Score: string;
  team2: string;
  overs: string;
  extraMarketsCount: number;
  showMoreMarkets?: boolean;
  odds: {
    back1: number;
    lay1: number;
    back2: number;
    lay2: number;
  };
}

@Component({
  imports: [CommonModule, RouterLink, Footer, Betslip],
  selector: 'app-league-details',
  styleUrl: './league-details.scss',
  templateUrl: './league-details.html',
})
export class LeagueDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);

  virtualId = 'quantum-cricket';
  leagueTitle = 'Quantum Cricket League';
  isExpanded = true;

  // Mock Data containing Match IDs
  matches: VirtualMatchItem[] = [
    {
      id: 'del-vs-blr',
      team1: 'Delhi Women (V)',
      team1Score: '93/4',
      team2: 'Bengaluru Women (V)',
      overs: '15 Ov',
      extraMarketsCount: 5,
      showMoreMarkets: false,
      odds: { back1: 13, lay1: 25, back2: 400, lay2: 775 },
    },
    {
      id: 'guj-vs-blr',
      team1: 'Gujarat (V)',
      team1Score: '89/2',
      team2: 'Bengaluru (V)',
      overs: '11 Ov',
      extraMarketsCount: 5,
      showMoreMarkets: true, // Shows "More Markets >" button as per screenshot
      odds: { back1: 0, lay1: 0, back2: 0, lay2: 0 },
    },
    {
      id: 'nz-vs-sl',
      team1: 'New Zealand (V)',
      team1Score: '20/0',
      team2: 'Sri Lanka (V)',
      overs: '1 Ov',
      extraMarketsCount: 2,
      showMoreMarkets: false,
      odds: { back1: 27, lay1: 44, back2: 225, lay2: 375 },
    },
  ];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['virtualId']) {
        this.virtualId = params['virtualId'];
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  toggleAccordion(): void {
    this.isExpanded = !this.isExpanded;
  }
}
