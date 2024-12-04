import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashProfComponent } from './dash-prof.component';

describe('DashProfComponent', () => {
  let component: DashProfComponent;
  let fixture: ComponentFixture<DashProfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashProfComponent]
    });
    fixture = TestBed.createComponent(DashProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
