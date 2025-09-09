import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appAutoScrollBottom]',
  standalone: true
})
export class AutoScrollBottomDirective implements OnChanges {
  @Input() appAutoScrollBottom!: unknown;
  constructor(private el: ElementRef<HTMLElement>) {}
  ngOnChanges() {
    queueMicrotask(() =>
      this.el.nativeElement.scrollTo({ top: this.el.nativeElement.scrollHeight })
    );
  }
}
