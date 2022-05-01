import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatlength',
  pure: false,
})
export class LengthFormatPipe implements PipeTransform {
  constructor() {}

  transform(item: string): any {
    switch (true) {
      case item > '1000':
        item = 'large';
        break;
      case item > '100' && item < '1000':
        item = 'normal';
        break;
      case item < '100':
        item = 'small';
        break;
    }
    return item;
  }
}
