import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingOverviewComponent } from './pricing-overview.component';

describe('PricingOverviewComponent', () => {
  let component: PricingOverviewComponent;
  let fixture: ComponentFixture<PricingOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
