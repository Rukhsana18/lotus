import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-betslip',
  styleUrl: './betslip.scss',
  templateUrl: './betslip.html',
})
export class Betslip {
  confirmBet: boolean = true;
  acceptBetterOdds: boolean = false;

  presets: number[] = [8000, 40000, 80000, 200000];
  originalPresets: number[] = [8000, 40000, 80000, 200000];

  activeInputIndex: number | null = null;
  currentInputValue: string = '';

  onInputFocus(index: number, value: number): void {
    this.activeInputIndex = index;
    this.currentInputValue = value.toString();
  }

  onInputChange(index: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const numericValue = inputElement.value.replace(/[^0-9]/g, '');

    inputElement.value = numericValue;
    this.currentInputValue = numericValue;
    this.presets[index] = numericValue ? Number(numericValue) : 0;
  }

  hasLengthError(): boolean {
    return this.currentInputValue.length > 6;
  }

  isInputInvalid(index: number): boolean {
    return this.activeInputIndex === index && this.hasLengthError();
  }

  // Detect clicks outside inputs to hide Save button if no changes were made
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.preset-input') && !target.closest('.save-btn')) {
      if (this.activeInputIndex !== null) {
        const currentIndex = this.activeInputIndex;
        // If value hasn't changed from original, hide button
        if (this.presets[currentIndex] === this.originalPresets[currentIndex]) {
          this.activeInputIndex = null;
        }
      }
    }
  }

  savePresets(): void {
    if (this.activeInputIndex !== null && !this.hasLengthError()) {
      this.originalPresets = [...this.presets];
      console.log('Saved Presets:', this.presets);
      this.activeInputIndex = null;
    }
  }
}