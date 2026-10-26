import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule,
    RouterLink
  ],
  templateUrl: './notification.html',
  styleUrl: './notification.scss'
})
export class Notification {
  isOpen = false;
  private router = inject(Router);

  toggleDrawer(): void {
    this.isOpen = !this.isOpen;
  }

  goToSettings(): void {
    this.isOpen = false;
    console.log('route to notification settings')
    this.router.navigate(['/general-settings/notification-center']);
  }
}