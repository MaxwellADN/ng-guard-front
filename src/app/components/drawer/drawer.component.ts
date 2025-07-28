import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tb-drawer',
  imports: [NgClass],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent {
  @Output() close = new EventEmitter<void>();
  @Input() isOpen = false;
  @Input() title: string = '';

  public closeDrawer(): void {
    this.isOpen = false;
    this.close.emit();
  }
}
