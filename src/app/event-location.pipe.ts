import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventLocation'
})
export class EventLocationPipe implements PipeTransform {

  transform(value: string): string {
    return value.toUpperCase();
  }
}
