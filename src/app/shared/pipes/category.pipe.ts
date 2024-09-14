import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
  standalone: false
})
export class CategoryPipe implements PipeTransform {

  transform(value: string): string {
    switch(value) {
      case 'front-end': return 'code';
      case 'bacck-end': return 'computer';
    }
    return 'code';
  }

}
