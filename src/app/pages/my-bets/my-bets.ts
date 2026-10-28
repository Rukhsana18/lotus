import { Component, HostListener, ElementRef, ViewChild, inject, OnInit } from '@angular/core';
import { SportsLayout } from '../../layout/sports-layout/sports-layout';
import { SportsHeader } from '../../shared/sports-header/sports-header';
import { Footer } from '../../layout/footer/footer';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [SportsLayout, SportsHeader, Footer, CommonModule, FormsModule],
  selector: 'app-my-bets',
  styleUrl: './my-bets.scss',
  templateUrl: './my-bets.html',
})
export class MyBets implements OnInit {
  private location = inject(Location);

  protected goBack(): void {
    this.location.back();
  }

  activeTab: 'current' | 'past' = 'current';
  currentFilter: 'matched' | 'unmatched' | 'cashedOut' = 'matched';
  pastFilter: 'regular' | 'cashedOut' = 'regular';

  isCalendarOpen: boolean = false;
  dateRangeText: string = '27/09/2026 - 27/10/2026';

  // Reactive Calendar State
  viewYear = 2026;
  viewMonth = 9; // October (0-indexed)
  startDate: Date | null = new Date(2026, 8, 26); // Sep 26, 2026
  endDate: Date | null = new Date(2026, 9, 27);   // Oct 27, 2026
  selectedPreset: string = '';

  leftMonthDays: any[] = [];
  rightMonthDays: any[] = [];
  leftMonthName = '';
  leftYear = 2026;
  rightMonthName = '';
  rightYear = 2026;

  @ViewChild('datePickerContainer') datePickerContainer!: ElementRef;

  ngOnInit(): void {
    this.generateCalendarViews();
  }

  selectTab(tab: 'current' | 'past'): void {
    this.activeTab = tab;
  }

  toggleCalendar(): void {
    this.isCalendarOpen = !this.isCalendarOpen;
    if (this.isCalendarOpen) {
      this.generateCalendarViews();
    }
  }

  generateCalendarViews(): void {
    // Left Month (e.g. September 2026)
    let leftM = this.viewMonth - 1;
    let leftY = this.viewYear;
    if (leftM < 0) { leftM = 11; leftY--; }
    this.leftMonthName = this.getMonthName(leftM);
    this.leftYear = leftY;
    this.leftMonthDays = this.getMonthDays(leftY, leftM);

    // Right Month (e.g. October 2026)
    this.rightMonthName = this.getMonthName(this.viewMonth);
    this.rightYear = this.viewYear;
    this.rightMonthDays = this.getMonthDays(this.viewYear, this.viewMonth);
  }

  getMonthDays(year: number, month: number): any[] {
    const days = [];
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Adjust so Monday is 0 (Mon=0, Tue=1, ... Sun=6)
    const offset = (firstDayIndex === 0 ? 6 : firstDayIndex - 1);
    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < offset; i++) {
      days.push({ dayNumber: '', date: null });
    }

    for (let i = 1; i <= totalDays; i++) {
      days.push({ dayNumber: i, date: new Date(year, month, i) });
    }
    return days;
  }

  getMonthName(month: number): string {
    const names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return names[month];
  }

  prevMonth(): void {
    this.viewMonth--;
    if (this.viewMonth < 0) { this.viewMonth = 11; this.viewYear--; }
    this.generateCalendarViews();
  }

  nextMonth(): void {
    this.viewMonth++;
    if (this.viewMonth > 11) { this.viewMonth = 0; this.viewYear++; }
    this.generateCalendarViews();
  }

  selectDate(date: Date): void {
    this.selectedPreset = '';
    if (!this.startDate || (this.startDate && this.endDate)) {
      this.startDate = date;
      this.endDate = null;
    } else if (date < this.startDate) {
      this.startDate = date;
    } else {
      this.endDate = date;
    }
  }

  isInRange(date: Date): boolean {
    if (!this.startDate || !this.endDate) return false;
    return date > this.startDate && date < this.endDate;
  }

  isStartDate(date: Date): boolean {
    if (!this.startDate) return false;
    return date.toDateString() === this.startDate.toDateString();
  }

  isEndDate(date: Date): boolean {
    if (!this.endDate) return false;
    return date.toDateString() === this.endDate.toDateString();
  }

  isToday(date: Date): boolean {
    const today = new Date(2026, 9, 27); // Oct 27, 2026 based on your context
    return date.toDateString() === today.toDateString();
  }

  selectPreset(type: 'today' | '7days' | '30days'): void {
    this.selectedPreset = type;
    const today = new Date(2026, 9, 27);
    this.endDate = new Date(today);
    this.startDate = new Date(today);

    if (type === '7days') {
      this.startDate.setDate(today.getDate() - 7);
    } else if (type === '30days') {
      this.startDate.setDate(today.getDate() - 30);
    }
  }

  clearSelection(): void {
    this.startDate = null;
    this.endDate = null;
    this.dateRangeText = '';
    this.selectedPreset = '';
  }

  applySelection(): void {
    if (this.startDate && this.endDate) {
      const formatDate = (d: Date) => {
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
      };
      this.dateRangeText = `${formatDate(this.startDate)} - ${formatDate(this.endDate)}`;
    }
    this.isCalendarOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.datePickerContainer && !this.datePickerContainer.nativeElement.contains(event.target)) {
      this.isCalendarOpen = false;
    }
  }
}