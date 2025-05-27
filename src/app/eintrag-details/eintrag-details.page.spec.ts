import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EintragDetailsPage } from './eintrag-details.page';

describe('EintragDetailsPage', () => {
  let component: EintragDetailsPage;
  let fixture: ComponentFixture<EintragDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EintragDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
