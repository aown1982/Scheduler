import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[MobileHide]',
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class MobileHideDirective {

  private _defaultMaxWidth = 768;
    private el: HTMLElement;

    constructor(el: ElementRef) {
        this.el = el.nativeElement;
    }

    @Input('mobileHide') mobileHide: number;

    onResize(event:Event) {
        const window: any = event.target;
        const currentWidth: number = window.innerWidth;
        if (currentWidth < (this.mobileHide || this._defaultMaxWidth)) {
            this.el.style.display = 'none';
        }else { this.el.style.display = 'block'; }
    }
}
