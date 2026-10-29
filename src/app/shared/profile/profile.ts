import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-profile',
  styleUrl: './profile.scss',
  templateUrl: './profile.html',
})
export class Profile implements OnInit, OnDestroy {
  isOpen = false;
  private router = inject(Router);
  private authService = inject(Auth);
  private logoutTimer: any;

  username: string = '';
  lastLogin: string = '';
  isLoadingProfile: boolean = false;
  user: any;

  ngOnInit(): void {
    this.formatLoginTime();
    this.initSessionTimeout();
    this.loadUserProfile(); // Fetch profile immediately on load so data is ready on 1st click
  }

  ngOnDestroy(): void {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
  }

  toggleDrawer(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.formatLoginTime();
    }
  }

  loadUserProfile() {
    this.isLoadingProfile = true;
    this.authService.getUserProfile().subscribe({
      next: (profile: any) => {
        this.isLoadingProfile = false;
        if (profile.data) {
          localStorage.setItem('user', JSON.stringify(profile.data?.user));
          this.user = profile.data.user;
        }
      },
      error: (err) => {
        this.isLoadingProfile = false;
        console.error('Failed to load profile:', err);
      }
    });
  }

  private formatLoginTime(): void {
    const timestamp = localStorage.getItem('loginTimestamp');
    if (timestamp) {
      const date = new Date(timestamp);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      this.lastLogin = `${day}/${month}/${year} ${hours}:${minutes}`;
    } else {
      this.lastLogin = 'N/A';
    }
  }

  private initSessionTimeout(): void {
    const timestamp = localStorage.getItem('loginTimestamp');
    if (timestamp) {
      const loginTime = new Date(timestamp).getTime();
      const thirtyMinutes = 30 * 60 * 1000;
      const elapsed = Date.now() - loginTime;
      const remainingTime = thirtyMinutes - elapsed;

      if (remainingTime <= 0) {
        this.signOut();
      } else {
        this.logoutTimer = setTimeout(() => {
          this.signOut();
        }, remainingTime);
      }
    }
  }

  signOut(): void {
    localStorage.clear();
    this.isOpen = false;
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }
}