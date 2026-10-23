import { Component } from '@angular/core';
import { LoginModal } from '../../shared/login-modal/login-modal';

@Component({
  selector: 'app-betslip',
  standalone: true,
  imports: [LoginModal],
  templateUrl: './betslip.html',
  styleUrl: './betslip.scss',
})
export class Betslip {}
