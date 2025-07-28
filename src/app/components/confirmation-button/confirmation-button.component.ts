import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tb-confirmation-button',
  imports: [NgClass],
  templateUrl: './confirmation-button.component.html',
  styleUrl: './confirmation-button.component.scss'
})
export class ConfirmationButtonComponent {
  @Input() confirmText: string = "Are you sure you want to delete this item?";
  @Input() buttonText: string = "Delete";
  @Input() buttonClass: string = 'flex items-center justify-center w-full px-5 py-3 text-base font-medium text-center text-white border border-gray-700 rounded-lg focus:ring-4 focus:ring-gray-600 dark:focus:ring-gray-900 cursor-pointer';
  @Input() buttonColorClass: string = "bg-gray-700 hover:bg-gray-800 focus:ring-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800";
  @Input() confirmButtonText: string = "Yes, I'm sure";
  @Input() cancelButtonText: string = "No, cancel";
  @Input() confirmButtonClass: string = "text-white font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center bg-red-600 hover:bg-red-800 focus:ring-red-300 dark:focus:ring-red-800";
  @Input() cancelButtonClass: string = "py-2.5 px-5 ms-3 text-sm font-medium focus:outline-none rounded-lg focus:z-10 focus:ring-4 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700";
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();
  public isModalOpen: boolean = false;

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }

  handleConfirm(): void {
    this.onConfirm.emit();
    this.toggleModal();
  }

  handleCancel(): void {
    this.onCancel.emit();
    this.toggleModal();
  }
}
