import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUsers, selectUsersTotal } from '../../../core/states/selectors/user.selector';
import { IUser } from '../../../shared/models/user.interface';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { createUserSuccess, getUsersPaginated, deleteUser, deleteUserSuccess, updateUserSuccess } from '../../../core/states/actions/user.action';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { StringUtils } from '../../../core/utils/string.utils';
import { ButtonComponent } from "../../../components/button/button.component";
import { ConfirmationButtonComponent } from "../../../components/confirmation-button/confirmation-button.component";
import { Actions } from '@ngrx/effects';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { ILink } from '../../../shared/models/link.interface';
import { TranslateService } from '@ngx-translate/core';
import { Role } from '../../../core/enums/role.enum';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  imports: [
    AsyncPipe,
    NgClass,
    DatePipe,
    UserEditComponent,
    PaginationComponent,
    BreadcrumbComponent,
    ButtonComponent,
    ConfirmationButtonComponent
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  private store = inject(Store);
  private actions$ = inject(Actions);
  private translate = inject(TranslateService);
  private snackBar = inject(MatSnackBar);
  public users$ = this.store.select(selectUsers);
  public totalUsers$ = this.store.select(selectUsersTotal);
  public userId: string | null = null;
  public showEditDiaog = false;
  public deleteUser: IUser | null = null;
  public page = 1;
  public pageSize = 10;
  public breadcrumbLinks: ILink[] = [
    { label: this.translate.instant('ACCOUNT.BREADCRUMB.HOME'), url: '/app/home' },
    { label: this.translate.instant('NAVBAR.MANAGE_USERS'), url: '/app/users', isActive: true },
  ];

  ngOnInit(): void {
    this.searchUsers();
    this.actions$.subscribe((action) => {
      switch (action.type) {
        case createUserSuccess.type:
          this.showEditDiaog = false;
          this.searchUsers();
          this.snackBar.open(this.translate.instant('USER.ADD.SUCCESS'), 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success'],
          });
          break;
        case deleteUserSuccess.type:
          this.showEditDiaog = false;
          this.searchUsers();
          this.snackBar.open(this.translate.instant('USER.DELETE.SUCCESS'), 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success'],
          });
          break;
        case updateUserSuccess.type:
          this.showEditDiaog = false;
          this.searchUsers();
          this.snackBar.open(this.translate.instant('USER.EDIT.SUCCESS'), 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success'],
          });
          break;
      }
    });
  }

  private searchUsers(): void {
    this.store.dispatch(getUsersPaginated({ pagination: { page: this.page, pageSize: this.pageSize } }));
  }

  public previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.searchUsers();
    }
  }

  public nextPage(): void {
    this.page++;
    this.searchUsers();
  }

  public openAdd(): void {
    this.userId = null;
    this.showEditDiaog = true;
  }

  public closeEdit(): void {
    this.userId = null;
    this.showEditDiaog = false;
  }

  public openEdit(id: string | null): void {
    this.userId = id;
    this.showEditDiaog = true;
  }

  public confirmDelete(user: IUser): void {
    if (user?.id) {
      this.store.dispatch(deleteUser({ userId: user.id }));
    }
  }

  public userInitials(fullname: string): string | null {
    return StringUtils.setUserInitials(fullname);
  }

  getRoleName(role: number | null): string {
    if (role == null) return '-';
    switch (role) {
      case Role.OWNER: return 'Owner';
      case Role.ADMIN: return 'Admin';
      case Role.USER: return 'User';
      case Role.GUEST: return 'Guest';
      default: return '-';
    }
  }
}
