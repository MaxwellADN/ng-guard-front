import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createUser } from '../../../core/states/actions/user.action';
import { IUser } from '../../../shared/models/user.interface';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.scss'
})
export class UserAddComponent {
  @Output() close = new EventEmitter<void>();
  private fb = inject(FormBuilder);
  private store = inject(Store);

  form: FormGroup = this.fb.group({
    fullname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    biography: [''],
    position: [''],
    country: [''],
    agreeWithTerms: [false, Validators.requiredTrue]
  });

  onSubmit() {
    if (this.form.invalid) return;
    const user: IUser = {
      id: null,
      email: this.form.value.email,
      password: this.form.value.password,
      fullname: this.form.value.fullname,
      createdAt: null,
      updatedAt: null,
      agreeWithTerms: this.form.value.agreeWithTerms,
      emailVerified: false,
      rememberMe: null,
      role: null,
      language: 'en',
      addresses: [],
      createdBy: null,
      biography: this.form.value.biography,
      position: this.form.value.position,
      country: this.form.value.country
    };
    this.store.dispatch(createUser({ user }));
    this.close.emit();
  }

  onCancel() {
    this.close.emit();
  }
}
