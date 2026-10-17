import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Footer } from '../../layout/footer/footer';

@Component({
  selector: 'app-league-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, 
    Footer
  ],
  templateUrl: './league-detail.html',
  styleUrl: './league-detail.scss',
})
export class LeagueDetail implements OnInit {
  leagueId = '';
  leagueTitle = 'International Twenty20 Matches';
  isExpanded = true;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.leagueId = params['leagueId'] || '1';
    });
  }

  goBack(): void {
    this.location.back();
  }

  toggleAccordion(): void {
    this.isExpanded = !this.isExpanded;
  }

}