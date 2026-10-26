import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-security',
  styleUrl: './security.scss',
  templateUrl: './security.html',
})
export class Security {

  is2faEnabled: boolean = false;
  verificationCode: string = '';
  qrCodeUrl: string = 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=otpauth://totp/SportsApp:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=SportsApp';

  onToggleChange(): void {
    if (!this.is2faEnabled) {
      this.verificationCode = '';
    }
  }

  onPressHere(): void {
    // Action for "Press here" link
    console.log('Press here clicked');
  }

  activateTwoFactor(): void {
    if (this.verificationCode) {
      console.log('Activating 2FA with code:', this.verificationCode);
      // API call to verify token
    }
  }
}
