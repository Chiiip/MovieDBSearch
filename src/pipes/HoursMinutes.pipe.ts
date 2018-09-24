import { PipeTransform, Pipe } from '../../node_modules/@angular/core';

@Pipe({
    name: 'hoursMinutes'
})
export class HoursMinutesPipe implements PipeTransform {

    transform(value: number): string {
        const hours = Math.floor(value / 60);
        const minutes = value - (hours * 60);
        return hours > 0 ? hours + 'h' + minutes + 'min' : minutes + 'min';
    }

}
