import { Component, Output, EventEmitter, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createUser, getUsersPaginated } from '../../../core/states/actions/user.action';
import { IUser } from '../../../shared/models/user.interface';
import { ButtonComponent } from '../../../components/button/button.component';
import { Role } from '../../../core/enums/role.enum';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.scss'
})
export class UserAddComponent {
  @Output() close = new EventEmitter<void>();
  @Input() public page: number = 1;
  @Input() public pageSize: number = 10;
  private fb = inject(FormBuilder);
  private store = inject(Store);
  public Role = Role;
  public form: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    biography: [''],
    position: [''],
    country: [''],
    role: [Role.USER, Validators.required], 
    agreeWithTerms: [false, Validators.requiredTrue]
  });

  public onSubmit(): void {
    if (this.form.invalid) return;
    const user: IUser = {
      id: null,
      email: this.form.value.email,
      password: this.form.value.password,
      fullname: `${this.form.value.firstName.trim()} ${this.form.value.lastName.trim()}`,
      createdAt: new Date(),
      updatedAt: null,
      agreeWithTerms: this.form.value.agreeWithTerms,
      emailVerified: false,
      rememberMe: null,
      biography: this.form.value.biography,
      position: this.form.value.position,
      role: this.form.value.role,
      language: 'en',
      addresses: [],
      createdBy: null,
    };
    this.store.dispatch(createUser({ user }));
    this.close.emit();
  }

  public onCancel(): void {
    this.close.emit();
  }
}
