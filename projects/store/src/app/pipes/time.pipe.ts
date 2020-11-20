import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: '12Hour'
})
export class ISOTimePipe extends
    DatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        console.log('ISOTimePipe:', value, arguments);
        return super.transform(value, 'h:mm a');
    }
}
