// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-add-event',
//   templateUrl: './add-event.component.html',
//   styleUrl: './add-event.component.css'
// })
// export class AddEventComponent {

// }

// import { Component, Output, EventEmitter } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Event } from '../event-model';
// import { EventService } from '../event.service';

// @Component({
//   selector: 'app-add-event',
//   templateUrl: './add-event.component.html',
//   styleUrls: ['./add-event.component.css']
// })
// export class AddEventComponent {
//   @Output() eventAdded = new EventEmitter<Event>();
//   eventForm: FormGroup;

//   constructor(private fb: FormBuilder, private eventService: EventService) {
//     this.eventForm = this.fb.group({
//       name: ['', [Validators.required, Validators.minLength(3)]],
//       location: ['', [Validators.required]],
//       date: ['', [Validators.required]],
//       description: ['', [Validators.minLength(10)]]
//     });
//   }

//   // onSubmit(): void {
//   //   if (this.eventForm.valid) {
//   //     const newEvent: Event = { ...this.eventForm.value, id: Date.now().toString() };
//   //     this.eventService.addEvent(newEvent);  // Save event to localStorage via EventService
//   //     this.eventForm.reset();
//   //   }
//   onSubmit(): void {
//     if (this.eventForm.valid) {
//       const newEvent: Event = this.eventForm.value;  // Get the event data from the form
//       this.eventService.addEvent(newEvent);  // Add the event to localStorage
//       this.eventAdded.emit(newEvent);  // Optionally, emit the event to parent component
//       this.eventForm.reset();  // Reset the form after submission
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  eventForm!: FormGroup;  // Declare the form group

  constructor(private fb: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form group with controls
    this.eventForm = this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      location: ['', [Validators.required]],
      date: ['', [Validators.required, this.futureDateValidator]],
      description: ['', [Validators.required]]
    });
  }

  futureDateValidator(control: any): { [key: string]: boolean } | null {
    const date = new Date(control.value);
    if (date <= new Date()) {
      return { 'futureDate': true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      console.log('Form Submitted!', this.eventForm.value);

      // Call the addEvent method from EventService to send data to json-server
      this.eventService.addEvent(this.eventForm.value).subscribe(
        (response) => {
          console.log('Event successfully added:', response);
          alert('Event successfully added!');
          this.eventForm.reset();  // Reset the form after successful submission
        },
        (error) => {
          console.log('Error adding event:', error);
          alert('Error adding event. Please try again.');
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  goBack(): void {
    // Navigate to the home page when the button is clicked
    this.router.navigate(['/home']);
  }
}



