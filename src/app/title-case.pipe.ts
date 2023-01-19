import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCaseSusmit',
})
export class TitleCasePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (value === '') {
      return value;
    }
    return value!.charAt(0).toUpperCase() + value!.slice(1);
  }
}
