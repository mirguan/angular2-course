import {DurationPipe} from './duration.pipe';

describe('Pipe: Duration', () => {
    let pipe: DurationPipe;

    beforeEach(() => {
        pipe = new DurationPipe();
    });

    it('should not transform negative values', () => {
        expect(pipe.transform(-1)).toEqual('-1');
        expect(pipe.transform(-94)).toEqual('-94');
    });

    it('should transform minutes less than 60 without "h"', () => {
        expect(pipe.transform(40)).toEqual('40min');
        expect(pipe.transform(1)).toEqual('1min');
    });

    it('should transform minutes', () => {
        expect(pipe.transform(60)).toEqual('1h 0min');
        expect(pipe.transform(84)).toEqual('1h 24min');
        expect(pipe.transform(1440)).toEqual('24h 0min');
        expect(pipe.transform(1501)).toEqual('25h 1min');
    });
});
