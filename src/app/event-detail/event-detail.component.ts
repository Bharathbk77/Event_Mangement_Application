import { Component , OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent implements OnInit {
  events: any[] = [];  // Store all event details
  isEmpty: boolean = false;
  // New property to track the event being edited
  editedEvent: any = null;
  searchId: string = '';  // This property will hold the search input value
  searchResult: any = null;  // Store the searched event for highlighting

  constructor(private eventService: EventService , private router: Router) {}

  ngOnInit(): void {
    // Fetch all events when the component initializes
    this.eventService.getEvents().subscribe(
      (data) => {
        // Set showDetails to false for all events after fetching the data
        this.events = data.map(event => ({
          ...event,
          showDetails: false  // Set the default value of showDetails to false
        })).sort((a, b) => {
          // Convert dates to Date objects for comparison
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  // Method to search for an event by ID
  searchEvent(): void {
    if (this.searchId) {
      this.searchResult = this.events.find(event => event.id === this.searchId);

      // If no event is found, show an alert
    if (!this.searchResult) {
      alert('No event found with the provided ID.');
    }
    
    } else {
      this.searchResult = null;  // Reset if the search field is cleared
    }
  }

  // Toggle the 'showDetails' flag to expand/collapse the card
  toggleDetails(eventId: string): void {
    const event = this.events.find(event => event.id === eventId);
    if (event) {
      event.showDetails = !event.showDetails;  // Toggle the visibility of event details
    }
  }


  goBack(): void {
    // Navigate to the home page when the button is clicked
    this.router.navigate(['/home']);
  }
  
   // Load events from the API
   loadEvents() {
    this.eventService.getEvents().subscribe((events: any[]) => {
      this.events = events;
    });
  }
  deleteEvent(eventId: string) {
    this.eventService.deleteEvent(eventId).subscribe(() => {
      // After deletion, reload events to reflect the updated list
      this.loadEvents();
    });
  }

  // Start editing an event by selecting it and setting 'editedEvent' to that event
  editEvent(eventId: string): void {
    const event = this.events.find(e => e.id === eventId);
    if (event) {
      this.editedEvent = { ...event }; // Make a copy of the event to edit
    }
  }

  // Save the updated event after editing
  saveEvent(): void {
    if (this.editedEvent) {
      this.eventService.updateEvent(this.editedEvent).subscribe(
        () => {
          this.loadEvents();  // Reload the events after successful update
          this.editedEvent = null;  // Reset editedEvent after saving
        },
        (error) => {
          console.error('Error updating event:', error);
        }
      );
    }
  }

  // Cancel the edit mode and reset the form
  cancelEdit(): void {
    this.editedEvent = null;
  }

}