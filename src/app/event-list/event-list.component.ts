import { Component ,OnInit} from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent {
  events: any[] = [];  // Array to store events
  isEmpty: boolean = false;

  constructor(private eventService: EventService , private router: Router) {}

  ngOnInit(): void {
    // Fetch the events when the component initializes
    this.eventService.getEvents().subscribe(
      (data) => {
        this.events = data;  // Store the fetched events in the events array
      },
      (error) => {
        console.error('Error fetching events:', error);  // Log the error in the console
      }
    );
  }

  goToEventDetails(eventId: string): void {
    // Navigate to the event-details page and pass the event ID
    this.router.navigate(['/event-details', eventId]);
  }

  goBack(): void {
    // Navigate to the home page when the button is clicked
    this.router.navigate(['/home']);
  }

  goToEventDetail(eventId: string): void {
    // Navigate to the event details page and pass the event ID as a parameter
    this.router.navigate(['/event-details', eventId]);
  }
}
