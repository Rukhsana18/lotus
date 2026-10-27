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
import { switchMap } from 'rxjs/operators';

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

    // 1. Login API
    this.authService.login({ email: username.trim(), password }).pipe(
      // 2. Fetch User Balance
      switchMap((loginRes: any) => {
        // Save fallback/extracted user_id from login response if available
        if (loginRes?.user_id || loginRes?.id) {
          localStorage.setItem('user_id', (loginRes.user_id || loginRes.id).toString());
        }
        return this.authService.getUserBalance();
      }),
      // 3. Fetch User Exposure
      switchMap((balanceRes: any) => {
        if (balanceRes) {
          localStorage.setItem('balance', JSON.stringify(balanceRes));
        }
        const userId = Number(localStorage.getItem('user_id')) || 2;
        return this.authService.getUserExposure(userId);
      })
    ).subscribe({
      next: (exposureRes: any) => {
        this.isLoading = false;
        if (exposureRes) {
          localStorage.setItem('exposure', JSON.stringify(exposureRes));
        }

        // Programmatically close Bootstrap modal
        const modalEl = document.getElementById('loginModal');
        if (modalEl) {
          const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
          modalInstance.hide();
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Login sequence failed. Please try again.';
      }
    });
  }
}