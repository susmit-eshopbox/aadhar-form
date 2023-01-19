import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[highlight]',
})
export class HighlightDirective {
  constructor(private eleRef: ElementRef) {}
  @Input() highlight: any;
  @Input() colorname: any;
  @HostListener('mouseover') onMouseOver() {
    this.eleRef.nativeElement.style.color = this.highlight;
  }
  @HostListener('mouseover') onMouseLeave() {
    this.eleRef.nativeElement.style.color = this.colorname;
  }
}
