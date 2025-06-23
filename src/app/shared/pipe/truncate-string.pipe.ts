import { Pipe, PipeTransform } from '@angular/core';
import { VALIDATION_LIMIT } from '../config/common-config';

@Pipe({
  name: 'truncateString',
  standalone: true
})
export class TruncateStringPipe implements PipeTransform {

  transform(value: string, limit: number = VALIDATION_LIMIT.STRING_MAX_LENGTH): string {
    if(!value) return " ";
    return (value.length > limit)? value.slice(0,limit) + "....." : value;
  } 

}
