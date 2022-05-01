import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatHeight',
  pure: false,
})
export class HeightFormatPipe implements PipeTransform {
  constructor() {}

  transform(item: string): any {
    switch (true) {
      case item > '200':
        item = 'high';
        break;
      case item > '100' && item < '200':
        item = 'normal';
        break;
      case item < '100':
        item = 'low';
        break;
    }
    return item;
  }
}
