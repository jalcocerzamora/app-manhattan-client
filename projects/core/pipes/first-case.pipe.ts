import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstcase'
})
export class FirstCasePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const result = (value !== undefined && value !== null ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : '');
    return result;
  }

}
