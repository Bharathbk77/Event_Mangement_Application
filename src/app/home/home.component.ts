import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  events: any[] = [];  // Define the events array to hold the fetched data

  constructor(private eventService: EventService , private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadEvents();  // Fetch events when the component is initialized

    // Check if the user is logged in. If not, redirect to the login page
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }

  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
  loadEvents(): void {
    this.eventService.getEvents().subscribe(
      (data) => {
        this.events = data;  // Assign fetched events to the events array
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }
}