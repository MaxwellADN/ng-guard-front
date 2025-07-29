import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'tb-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() loading: boolean = false; 
  @Input() loadingText: string = 'Loading...'; 
  @Input() buttonClass: string = 'flex items-center justify-center w-full px-5 py-3 text-base font-medium text-center text-white bg-gray-700 border border-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-600 dark:focus:ring-gray-900 cursor-pointer';
  @Input() spinnerClass: string = 'text-white mb-1 mr-2';
  @Input() spinnerColor: string = 'blue'; 
  @Input() spinnerSize: string = 'w-4 h-4';
  @Input() type: string = 'button'; 
  @Input() size: 'small' | 'medium' | 'large' = 'small';
  @Input() disabled: boolean = false;

  get sizeClass(): string {
    switch (this.size) {
      case 'small':
        return 'px-3 py-2 text-sm';
      case 'large':
        return 'px-6 py-4 text-lg';
      default:
        return 'px-5 py-3 text-base';
    }
  }
}