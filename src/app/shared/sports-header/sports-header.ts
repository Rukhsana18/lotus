import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-sports-header',
  standalone: true,
  styleUrl: './sports-header.scss',
  templateUrl: './sports-header.html',
})
export class SportsHeader {
  @Input() pageTitle = '';
  @Input() activeTab: 'live' | 'leagues' = 'live';

  @Output() readonly back = new EventEmitter<void>();
  @Output() readonly activeTabChange = new EventEmitter<'live' | 'leagues'>();

  protected goBack(): void {
    this.back.emit();
  }

  protected setMainTab(tab: 'live' | 'leagues'): void {
    this.activeTab = tab;
    this.activeTabChange.emit(tab);
  }
}
