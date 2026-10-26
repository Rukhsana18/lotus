// import { Component } from '@angular/core';

// @Component({
//   imports: [],
//   selector: 'app-one-click-betting',
//   styleUrl: './one-click-betting.scss',
//   templateUrl: './one-click-betting.html',
// })
// export class OneClickBetting {}
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-one-click-betting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './one-click-betting.html',
  styleUrl: './one-click-betting.scss'
})
export class OneClickBetting {
  showConfirmationPopup: boolean = true;
  
  stakes: number[] = [1900, 9500, 19000];
  originalStakes: number[] = [1900, 9500, 19000];
  
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
    this.stakes[index] = numericValue ? Number(numericValue) : 0;
  }

  hasLengthError(): boolean {
    return this.currentInputValue.length > 6;
  }

  isInputInvalid(index: number): boolean {
    return this.activeInputIndex === index && this.hasLengthError();
  }

  // Hide Save button on outside click if no changes were made to the active field
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.stake-input') && !target.closest('.save-btn')) {
      if (this.activeInputIndex !== null) {
        const currentIndex = this.activeInputIndex;
        if (this.stakes[currentIndex] === this.originalStakes[currentIndex]) {
          this.activeInputIndex = null;
        }
      }
    }
  }

  saveStakes(): void {
    if (this.activeInputIndex !== null && !this.hasLengthError()) {
      this.originalStakes = [...this.stakes];
      console.log('Saved Stakes:', this.stakes);
      this.activeInputIndex = null;
    }
  }
}