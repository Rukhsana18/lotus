
import { Component, inject, HostListener, OnInit } from '@angular/core';
import { Auth } from '../../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-casino-stakes',
  styleUrl: './casino-stakes.scss',
  templateUrl: './casino-stakes.html',
})
export class CasinoStakes implements OnInit {
  private auth = inject(Auth);

  stakes: number[] = [];
  originalStakes: number[] = [];
  stakeKeys: string[] = [];

  activeInputIndex: number | null = null;
  currentInputValue = '';
  showConfirmationPopup = true;
  isSaving = false;

  ngOnInit(): void {
    this.getStakes();
  }

  getStakes(): void {
    this.auth.getStake().subscribe({
      next: (res: any) => {
        // Supports either { data: { btn1: 2000 } }
        // or { data: { data: { btn1: 2000 } } }
        const data = res.data;

        if (!data || Array.isArray(data)) {
          return;
        }

        this.stakeKeys = Object.keys(data);
        this.stakes = this.stakeKeys.map(key => Number(data[key]));
        this.originalStakes = [...this.stakes];
      },
      error: (err: any) => {
        console.error('Failed to fetch stakes:', err);
      }
    });
  }

  onInputFocus(index: number, value: number): void {
    this.activeInputIndex = index;
    this.currentInputValue = String(value);
  }

  onInputChange(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const numericValue = input.value.replace(/[^0-9]/g, '');

    input.value = numericValue;
    this.currentInputValue = numericValue;
    this.stakes[index] = numericValue ? Number(numericValue) : 0;
  }

  hasLengthError(): boolean {
    return this.currentInputValue.length > 6;
  }

  isInputInvalid(index: number): boolean {
    return this.activeInputIndex === index && this.hasLengthError();
  }

  hasChanges(): boolean {
    return this.stakes.some(
      (stake, index) => stake !== this.originalStakes[index]
    );
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (
      !target.closest('.stake-input') &&
      !target.closest('.save-btn')
    ) {
      if (this.activeInputIndex !== null && !this.hasChanges()) {
        this.activeInputIndex = null;
      }
    }
  }

  saveStakes(): void {
    if (this.hasLengthError() || this.isSaving || !this.hasChanges()) {
      return;
    }

    const payload: Record<string, number> = {};

    this.stakeKeys.forEach((key, index) => {
      payload[key] = this.stakes[index];
    });

    this.isSaving = true;

    this.auth.updateStake(payload).subscribe({
      next: (res: any) => {
        console.log('Stakes updated successfully:', res);

        this.originalStakes = [...this.stakes];
        this.activeInputIndex = null;
        this.isSaving = false;
      },
      error: (err: any) => {
        console.error('Failed to update stakes:', err);
        this.isSaving = false;
      }
    });
  }
}
