import { Component } from '@angular/core';
import { Betslip } from '../betslip/betslip';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-sports-layout',
  standalone: true,
  imports: [Sidebar, Betslip],
  templateUrl: './sports-layout.html',
  styleUrl: './sports-layout.scss',
})
export class SportsLayout {}
