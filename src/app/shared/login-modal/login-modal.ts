import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

// Declare bootstrap for JS modal methods if types aren't installed globally
declare var bootstrap: any;

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.scss'
})
export class LoginModal {
  loginForm: FormGroup;
  showPassword = false;
  submitted = false;

  @ViewChild('loginModalElement') modalElement!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
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

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username } = this.loginForm.getRawValue();

    // Store state in local storage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username.trim());

    // Programmatically close the Bootstrap modal
    const modalEl = document.getElementById('loginModal');
    if (modalEl) {
      const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modalInstance.hide();
    }

    // Optionally reload or sync layout state, then navigate
    window.location.reload(); 
  }
}