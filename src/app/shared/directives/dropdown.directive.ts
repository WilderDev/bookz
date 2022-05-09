import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  // Inject Packages
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostBinding('class.show') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;

    const dropdownList =
      this.elRef.nativeElement.querySelector('.dropdown-menu');

    this.isOpen
      ? this.renderer.addClass(dropdownList, 'show')
      : this.renderer.removeClass(dropdownList, 'show');
  }
}
