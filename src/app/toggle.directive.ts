import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[toggle]',
})
export class ToggleDirective {
  constructor(
    private viewRef: ViewContainerRef,
    private tempRef: TemplateRef<any>
  ) {}

  @Input() toggle: any;

  ngOnChanges() {
    if (this.toggle) {
      this.viewRef.createEmbeddedView(this.tempRef);
    } else {
      this.viewRef.clear();
    }
  }
}
