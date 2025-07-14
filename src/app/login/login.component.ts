import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.username && this.password) {
      const user = this.authService.authenticate(this.username, this.password);
      if (user) {
        // Successfully authenticated, navigate to the home page
        this.router.navigate(['/home']);
      } else {
        // Authentication failed
        this.errorMessage = 'Invalid username or password!';
      }
    } else {
      this.errorMessage = 'Please enter both username and password.';
    }
  }
}
