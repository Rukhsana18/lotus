// import { Component, EventEmitter, Input, Output } from '@angular/core';

// @Component({
//   imports: [],
//   selector: 'app-sports-header',
//   standalone: true,
//   styleUrl: './sports-header.scss',
//   templateUrl: './sports-header.html',
// })
// export class SportsHeader {
//   @Input() pageTitle = '';
//   @Input() activeTab: 'live' | 'leagues' = 'live';
//   @Input() showTabs = true;

//   @Output() readonly back = new EventEmitter<void>();
//   @Output() readonly activeTabChange = new EventEmitter<'live' | 'leagues'>();

//   protected goBack(): void {
//     this.back.emit();
//   }

//   protected setMainTab(tab: 'live' | 'leagues'): void {
//     this.activeTab = tab;
//     this.activeTabChange.emit(tab);
//   }
// }
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-sports-header',
  standalone: true,
  styleUrl: './sports-header.scss',
  templateUrl: './sports-header.html',
})
export class SportsHeader {
  @Input() pageTitle = '';
  @Input() activeTab: 'live' | 'leagues' = 'live';
  @Input() showTabs = true;

  @Output() readonly back = new EventEmitter<void>();
  @Output() readonly parentClick = new EventEmitter<void>();
  @Output() readonly activeTabChange = new EventEmitter<'live' | 'leagues'>();

  protected hasSubroute(): boolean {
    return this.pageTitle.includes('/');
  }

  protected getParentTitle(): string {
    return this.pageTitle.split('/')[0].trim();
  }

  protected getSubTitle(): string {
    const parts = this.pageTitle.split('/');
    return parts.length > 1 ? parts[1].trim() : '';
  }

  protected onParentClick(): void {
    this.parentClick.emit();
  }

  protected goBack(): void {
    this.back.emit();
  }

  protected setMainTab(tab: 'live' | 'leagues'): void {
    this.activeTab = tab;
    this.activeTabChange.emit(tab);
  }
}