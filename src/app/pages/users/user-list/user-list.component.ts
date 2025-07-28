import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../core/states/selectors/user.selector';
import { IUser } from '../../../shared/models/user.interface';
import { AsyncPipe, NgClass } from '@angular/common';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserAddComponent } from '../user-add/user-add.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';

@Component({
  selector: 'app-user-list',
  imports: [
    AsyncPipe,
    NgClass, 
    UserAddComponent, 
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  private store = inject(Store);
  public users$ = this.store.select(selectUser);
  public showAdd = false;
  public editUser: IUser | null = null;
  public deleteUser: IUser | null = null;

  public openAdd(): void {
    this.showAdd = true;
  }

  public closeAdd(): void {
    this.showAdd = false;
  }

  public openEdit(user: IUser): void {
    this.editUser = user;
  }

  public closeEdit(): void {
    this.editUser = null;
  }

  public openDelete(user: IUser): void {
    this.deleteUser = user;
  }

  public closeDelete(): void {
    this.deleteUser = null;
  }
}
