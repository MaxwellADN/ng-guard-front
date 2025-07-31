import { Component, Output, EventEmitter, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createUser, getUser, getUsersPaginated, getUserSuccess, updateUser } from '../../../core/states/actions/user.action';
import { IUser } from '../../../shared/models/user.interface';
import { ButtonComponent } from '../../../components/button/button.component';
import { Role } from '../../../core/enums/role.enum';
import { selectUser } from '../../../core/states/selectors/user.selector';
import { Actions } from '@ngrx/effects';
import { IAddress } from '../../../shared/models/address.interface';

@Component({
  selector: 'app-user-edit',
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Input() public page: number = 1;
  @Input() public pageSize: number = 10;
  @Input() public userId: string | null = null;
  private actions$ = inject(Actions);
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private user: IUser | null = null;
  public Role = Role;
  public form: FormGroup = this.fb.group({
    fullname: ['', Validators.required],
    email: ['', []], // Validators set dynamically
    password: ['', []], // Validators set dynamically
    biography: [''],
    position: [''],
    country: [''],
    addressLine1: [''],
    addressLine2: [''],
    department: [''],
    zipCode: [''],
    city: [''],
    phoneNumber: [''],
    role: [Role.USER, Validators.required],
    agreeWithTerms: [false, Validators.requiredTrue]
  });

  ngOnInit(): void {
    // Set validators for email and password based on userId
    if (this.userId) {
      this.form.get('email')?.clearValidators();
      this.form.get('email')?.updateValueAndValidity();
      this.form.get('password')?.clearValidators();
      this.form.get('password')?.updateValueAndValidity();
    } else {
      this.form.get('email')?.setValidators([Validators.required, Validators.email]);
      this.form.get('email')?.updateValueAndValidity();
      this.form.get('password')?.setValidators([Validators.required]);
      this.form.get('password')?.updateValueAndValidity();
    }

    if (this.userId) {
      this.store.dispatch(getUser({ userId: this.userId }));
    }
    this.actions$.subscribe((action) => {
      if (action.type === getUserSuccess.type) {
        this.store.select(selectUser).subscribe((user: IUser | null) => {
          if (user) {
            this.user = user;
            const address : IAddress | null = user.addresses && user.addresses[0] ? user.addresses[0] : null;
            this.form.patchValue({
              fullname: user.fullname,
              email: user.email,
              password: user.password || '',
              biography: user.biography,
              position: user.position,
              role: user.role,
              country: address?.country || '',
              addressLine1: address?.addressLine1 || '',
              addressLine2: address?.addressLine2 || '',
              department: address?.department || '',
              zipCode: address?.zipCode || '',
              city: address?.city || '',
              phoneNumber: address?.phoneNumber || '',
            });
          }
        });

      }
    });
  }

  public onSubmit(): void {
    console.log('Form submitted:', this.form.value);
    if (this.form.invalid) return;
    if (this.userId && this.user) {
      const user: IUser = {
        ...this.user,
        email: this.form.value.email,
        password: this.form.value.password,
        fullname: this.form.value.fullname.trim(),
        updatedAt: new Date(),
        agreeWithTerms: this.form.value.agreeWithTerms,
        biography: this.form.value.biography,
        position: this.form.value.position,
        role: this.form.value.role,
        addresses: [
          {
            country: this.form.value.country,
            addressLine1: this.form.value.addressLine1,
            addressLine2: this.form.value.addressLine2,
            department: this.form.value.department,
            zipCode: this.form.value.zipCode,
            city: this.form.value.city,
            phoneNumber: this.form.value.phoneNumber,
          }
        ]
      };
      this.store.dispatch(updateUser({ userId: this.userId, user }));
      this.close.emit();
    } else {
      const user: IUser = {
        id: null,
        email: this.form.value.email,
        password: this.form.value.password,
        fullname: this.form.value.fullname.trim(),
        createdAt: new Date(),
        updatedAt: null,
        agreeWithTerms: this.form.value.agreeWithTerms,
        emailVerified: false,
        rememberMe: null,
        biography: this.form.value.biography,
        position: this.form.value.position,
        role: this.form.value.role,
        language: 'en',
        addresses: [
          {
            country: this.form.value.country,
            addressLine1: this.form.value.addressLine1,
            addressLine2: this.form.value.addressLine2,
            department: this.form.value.department,
            zipCode: this.form.value.zipCode,
            city: this.form.value.city,
            phoneNumber: this.form.value.phoneNumber,
          }
        ],
        createdBy: this.user?.createdBy !== undefined ? this.user.createdBy : null,
      };
      this.store.dispatch(createUser({ user }));
      this.close.emit();
    }
  }

  public onCancel(): void {
    this.close.emit();
  }
}
