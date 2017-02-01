import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'app-duration'
})
export class DurationPipe implements PipeTransform {
    transform(value: number): string {
        if (value < 0) {
            return value.toString();
        }

        let hours: number = Math.floor( value / 60 );
        let minutes: number = Math.floor( value % 60 );

        if (hours === 0) {
            return `${minutes}min`;
        }

        return `${hours}h ${minutes}min`;
    }
}
