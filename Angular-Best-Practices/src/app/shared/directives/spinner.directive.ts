import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, Directive, Input, NgModule, TemplateRef, ViewContainerRef } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';

@Directive({
  selector: '[appSpinner]',
})
export class SpinnerDirective {
  isSpinning: any = null;
  spinner: MatProgressSpinner = null;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  @Input() set appSpinner(condition: boolean) {
    if (!!condition !== this.isSpinning) {
      this.spinner = null;
      this.viewContainer.clear();
      this.isSpinning = condition;
      if (!condition) {
        // Render the template
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else if (condition) {
        this.addSpinner();
      }
    }
  }

  private addSpinner() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MatProgressSpinner);
    const { instance } = this.viewContainer.createComponent<MatProgressSpinner>(componentFactory);
    instance.mode = 'indeterminate';
    instance._elementRef.nativeElement.classList.add('spin-on-instance');
    this.spinner = instance;
  }
}