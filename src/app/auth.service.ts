import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any = null;

  constructor() {}

  // Dummy authentication logic
  authenticate(username: string, password: string): any {
    // In a real-world scenario, you'd make an HTTP request to validate the user credentials.
    // Here, we'll just check if the username is 'admin' and the password is 'password' for simplicity.
    if (username === 'bharath' && password === 'bk77') {
      this.currentUser = { username: 'admin', role: 'admin' };  // Store user details
      return this.currentUser;
    }
    return null;
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  // Get the current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Logout the user
  logout() {
    this.currentUser = null;
  }
}
