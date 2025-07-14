// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class EventService {

//   constructor() { }
// }


// src/app/event.service.ts
// import { Injectable,EventEmitter} from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Event } from './event-model';
// @Injectable({ 
//   providedIn: 'root'
// })
// export class EventService {
//   private apiUrl = 'http://localhost:3000/api/events';  // Replace with actual API URL
//   selectedEvent = new EventEmitter<Event>();

//   constructor(private http: HttpClient) { }

//   getEvents(): Observable<Event[]> {
//     return this.http.get<Event[]>(this.apiUrl);
//   }

//   addEvent(event: Event): Observable<Event> {
//     return this.http.post<Event>(this.apiUrl, event);
//   }

//   deleteEvent(eventId: string): Observable<any> {
//     return this.http.delete<any>(`${this.apiUrl}/${eventId}`);
//   }
// import { Injectable, EventEmitter } from '@angular/core';
// import { Event } from './event-model';

// @Injectable({ 
//   providedIn: 'root'
// })
// export class EventService {
//   selectedEvent = new EventEmitter<Event>();

//   constructor() {}

//   // Retrieve events from localStorage
//   getEvents(): Event[] {
//     const events = localStorage.getItem('events');
//     return events ? JSON.parse(events) : [];  // Return empty array if no events are found
//   }

//   // Add a new event to localStorage
//   addEvent(event: Event): void {
//     const events = this.getEvents();  // Get current events
//     events.push(event);  // Add the new event
//     localStorage.setItem('events', JSON.stringify(events));  // Save events to localStorage
//   }

//   // Delete an event from localStorage (optional)
//   deleteEvent(eventId: string): void {
//     let events = this.getEvents();
//     events = events.filter(event => event.id !== eventId);  // Filter out the event to delete
//     localStorage.setItem('events', JSON.stringify(events));  // Save the updated events
//   }
// }


// import { Injectable, EventEmitter } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Event } from './event-model';  // Your Event model definition

// @Injectable({
//   providedIn: 'root'
// })
// export class EventService {
//   private apiUrl = 'http://localhost:3000/events';  // API URL to the JSON Server endpoint
//   selectedEvent = new EventEmitter<Event>();  // EventEmitter for selected events

//   constructor(private http: HttpClient) {}

//   // Retrieve all events from the mock backend (db.json)
//   getEvents(): Observable<Event[]> {
//     return this.http.get<Event[]>(this.apiUrl);
//   }

//   // Add a new event to the mock backend (db.json)
//   addEvent(event: Event): Observable<Event> {
//     const newEvent = { ...event, id: Date.now().toString() };  // Ensure each event has a unique ID
//     return this.http.post<Event>(this.apiUrl, newEvent);  // Send a POST request to add the event to db.json
//   }

//   // Delete an event by ID from the mock backend (db.json)
//   deleteEvent(eventId: string): Observable<void> {
//     const url = `${this.apiUrl}/${eventId}`;  // Endpoint to delete a specific event
//     return this.http.delete<void>(url);  // Send a DELETE request to remove the event from db.json
//   }
// }


// import { Injectable, EventEmitter } from '@angular/core';
// import { Event } from './event-model';  // Your Event model definition

// @Injectable({
//   providedIn: 'root'
// })
// export class EventService {
//   private apiUrl='http://localhost:3000/events';
//   selectedEvent = new EventEmitter<Event>();  // EventEmitter for selected events

//   constructor() {}

//   // Retrieve events from localStorage and return them as an array
//   getEvents(): Event[] {
//     if (typeof window !== 'undefined' && window.localStorage) {
//       const events = localStorage.getItem('events');
//       return events ? JSON.parse(events) : [];  // Parse or return an empty array if no events
//     }
//     return []; // Return empty array if localStorage is not available
//   }

//   // Add a new event to localStorage
//   addEvent(event: Event): void {
//     if (typeof window !== 'undefined' && window.localStorage) {
//       const events = this.getEvents();  // Get current events from localStorage

//       // Add a unique ID for each new event
//       const newEvent = { ...event, id: Date.now().toString() };  // Ensure ID is set
//       events.push(newEvent);  // Add the new event to the array

//       // Save the updated events array back to localStorage as JSON
//       localStorage.setItem('events', JSON.stringify(events));  // Save to localStorage
//     }
//   }

//   // Delete an event from localStorage
//   deleteEvent(eventId: string): void {
//     if (typeof window !== 'undefined' && window.localStorage) {
//       let events = this.getEvents();  // Get current events
//       events = events.filter((event: Event) => event.id !== eventId);  // Filter out the event by ID
//       localStorage.setItem('events', JSON.stringify(events));  // Save updated events to localStorage
//     }
//   }
// }



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:3000/events';  // The endpoint for events in json-server

  constructor(private http: HttpClient) { }

  // POST request to add an event
  addEvent(event: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, event);
  }

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getEventById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  deleteEvent(eventId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${eventId}`);
  }
  // Update an event
  updateEvent(event: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${event.id}`, event);
  }
}


