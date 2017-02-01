import { NgModule } from '@angular/core';

import { DurationPipe } from './duration.pipe';

export const pipes = [
    DurationPipe,
];

@NgModule({
    declarations: pipes,
    exports: pipes
})
export class PipesModule {}
