import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';

interface BootstrapTooltipInstance {
  dispose(): void;
}

interface BootstrapNamespace {
  Tooltip: new (element: HTMLElement) => BootstrapTooltipInstance;
}

declare global {
  interface Window {
    bootstrap?: BootstrapNamespace;
  }
}

@Directive({
  selector: '[appBootstrapTooltip]',
  standalone: true,
})
export class BootstrapTooltipDirective implements AfterViewInit, OnDestroy {
  private tooltip?: BootstrapTooltipInstance;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const Tooltip = window.bootstrap?.Tooltip;
    if (!Tooltip) {
      throw new Error('Bootstrap Tooltip is unavailable. Ensure the Bootstrap JavaScript bundle is loaded.');
    }

    this.tooltip = new Tooltip(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.tooltip?.dispose();
  }
}
