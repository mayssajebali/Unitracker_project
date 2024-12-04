import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListematiereComponent } from './listematiere.component';

describe('ListematiereComponent', () => {
  let component: ListematiereComponent;
  let fixture: ComponentFixture<ListematiereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListematiereComponent]
    });
    fixture = TestBed.createComponent(ListematiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
