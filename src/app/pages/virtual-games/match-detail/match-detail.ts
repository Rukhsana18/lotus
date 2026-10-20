import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Footer } from '../../../layout/footer/footer';
import { Betslip } from '../../../layout/betslip/betslip';

@Component({
  imports: [CommonModule, RouterLink, Footer, Betslip],
  selector: 'app-match-detail',
  styleUrl: './match-detail.scss',
  templateUrl: './match-detail.html',
})
export class MatchDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);

  virtualId = 'quantum-cricket';
  matchId = '';

  // Dynamic Match Data based on Match ID
  matchDetails = {
    leagueName: 'Quantum Cricket League',
    matchNumber: '113',
    team1: 'Gujarat (V)',
    team2: 'Bengaluru (V)',
    currentScore: '91/2',
    winnerOdds: {
      team1Back: 60,
      team1Lay: 90,
      team2Back: 115,
      team2Lay: 170,
    },
  };

  accordionStates: { [key: string]: boolean } = {
    scoreboard: true,
    matchWinner: true,
    overMarket: true,
  };

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.virtualId = params['virtualId'] || 'quantum-cricket';
      this.matchId = params['matchId'] || 'guj-vs-blr';

      // Identify match ID & update view data dynamically
      this.loadMatchData(this.matchId);
    });
  }

  goBack(): void {
    this.location.back();
  }

  toggleSection(key: string): void {
    this.accordionStates[key] = !this.accordionStates[key];
  }

  private loadMatchData(id: string): void {
    if (id === 'del-vs-blr') {
      this.matchDetails = {
        leagueName: 'Quantum Cricket League',
        matchNumber: '112',
        team1: 'Delhi Women (V)',
        team2: 'Bengaluru Women (V)',
        currentScore: '93/4',
        winnerOdds: { team1Back: 13, team1Lay: 25, team2Back: 400, team2Lay: 775 },
      };
    } else if (id === 'guj-vs-blr') {
      this.matchDetails = {
        leagueName: 'Quantum Cricket League',
        matchNumber: '113',
        team1: 'Gujarat (V)',
        team2: 'Bengaluru (V)',
        currentScore: '91/2',
        winnerOdds: { team1Back: 60, team1Lay: 90, team2Back: 115, team2Lay: 170 },
      };
    }
  }
}
