import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    imports: [ButtonComponent],
    standalone: true
})
export class PaginationComponent implements OnChanges {
    @Output() previousPage = new EventEmitter<void>();
    @Output() nextPage = new EventEmitter<void>();
    @Input() currentPage: number = 1;
    @Input() totalItems: number = 0;
    @Input() itemsPerPage: number = 10;
    public hasNextPage: boolean = false;
    public hasPreviousPage: boolean = false;

    ngOnChanges(): void {
        this.hasPreviousPage = this.currentPage > 1;
        this.hasNextPage = this.currentPage * this.itemsPerPage < this.totalItems;
    }
}
