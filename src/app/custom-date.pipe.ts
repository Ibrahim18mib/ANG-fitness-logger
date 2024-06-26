import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import firebase from 'firebase/compat/app';

@Pipe({
  name: 'timestampDate',
})
export class TimestampDatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(
    timestamp: firebase.firestore.Timestamp,
    format: string = 'medium'
  ): any {
    if (timestamp instanceof firebase.firestore.Timestamp) {
      const jsDate = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
      return this.datePipe.transform(jsDate, format); // Format JavaScript Date using DatePipe
    }
    return timestamp;
  }
}
