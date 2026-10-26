import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
// import { AuthService } from './auth.service'; // Update path as necessary

declare var bootstrap: any;

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.scss'
})
export class LoginModal {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(Auth);

  loginForm: FormGroup;
  showPassword = false;
  submitted = false;
  isLoading = false;
  errorMessage: string = '';

  @ViewChild('loginModalElement') modalElement!: ElementRef;

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.getRawValue();
    this.isLoading = true;

    // The backend expects 'email' and 'password' payloads
    this.authService.login({ email: username.trim(), password }).subscribe({
      next: (response) => {
        this.isLoading = false;
        localStorage.setItem('username', username.trim());

        // Programmatically close the Bootstrap modal
        const modalEl = document.getElementById('loginModal');
        if (modalEl) {
          const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
          modalInstance.hide();
        }

        // Reload or sync layout state, then navigate
        window.location.reload();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Invalid username or password. Please try again.';
      }
    });
  }
}