import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarEtdComponent } from './navbar-etd.component';

describe('NavbarEtdComponent', () => {
  let component: NavbarEtdComponent;
  let fixture: ComponentFixture<NavbarEtdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarEtdComponent]
    });
    fixture = TestBed.createComponent(NavbarEtdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
