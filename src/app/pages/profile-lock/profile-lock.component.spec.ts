import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLockComponent } from './profile-lock.component';

describe('ProfileLockComponent', () => {
  let component: ProfileLockComponent;
  let fixture: ComponentFixture<ProfileLockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileLockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileLockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
