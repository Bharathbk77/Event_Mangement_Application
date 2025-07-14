export interface Event {
    id: string;  // You can use a string or a number for the ID
    name: string;
    location: string;
    date: string;  // You might want to use a Date object if you're handling dates
    description: string;
  }
  