import {
    AfterViewChecked, Directive, ElementRef, Input, OnChanges, Renderer,
    SimpleChanges
} from '@angular/core';


class Changes {
    keyword: string;
    items: number[] = [];
    length = 0;
}

@Directive({
    selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges, AfterViewChecked {
    @Input()
    keyword: string;
    changes: Changes = new Changes();

    constructor(private elementRef: ElementRef, private renderer: Renderer) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.validate();
    }

    ngAfterViewChecked(): void {
        this.validate();
    }

    validate() {
        let html = this.elementRef.nativeElement.innerHTML;

        html = this.undoHighlights(html);
        html = this.updateHighlights(html);
    }

    updateHighlights(html: string) {
        if (this.keyword) {
            let initial = html;
            let regex = new RegExp(this.keyword, 'gi');

            html = html.replace(regex, (match, item) => {
                this.changes.items.push(item);
                return `<span class="highlight">${match}</span>`;
            });

            this.changes.keyword = this.keyword;
            this.changes.length = html.length;

            if (initial !== html) {
                this.renderer.setElementProperty(this.elementRef.nativeElement, 'innerHTML', html);
            }
        }
        return html;
    }

    undoHighlights(html: string): string {
        if (this.changes && this.changes.items.length > 0/* && this.changes.length === html.length*/) {
            let initial = html;
            for (let position of this.changes.items) {
                let result = html.substr(0, position);
                let offset =  position + 24;
                result = result + html.substr(offset, this.changes.keyword.length);
                result = result + html.substr(offset + this.changes.keyword.length + 7);

                html = result;
            }
            if (initial !== html) {
                this.renderer.setElementProperty(this.elementRef.nativeElement, 'innerHTML', html);
            }
        }

        this.changes  = new Changes();
        return html;
    }
}


