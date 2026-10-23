import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { LoginModal } from './shared/login-modal/login-modal';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Header, LoginModal],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('lotus');
  protected readonly mobileMenuOpen = signal(false);

  protected setMobileMenuOpen(isOpen: boolean): void {
    this.mobileMenuOpen.set(isOpen);
  }
}
