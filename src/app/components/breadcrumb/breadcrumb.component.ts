import { Component, Input } from '@angular/core';
import { ILink } from '../../shared/models/link.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tb-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
@Input() public links!: ILink[];
}
