import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [NgClass],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  @Input() message: string = 'This is a toast message!';
  @Input() type: 'success' | 'error' | 'info' | 'warning' = 'info';
  @Input() isVisible: boolean = false;

  closeToast() {
    this.isVisible = false;
  }
}
