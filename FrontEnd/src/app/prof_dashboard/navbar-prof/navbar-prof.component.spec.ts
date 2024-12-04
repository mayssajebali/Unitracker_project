import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarProfComponent } from './navbar-prof.component';

describe('NavbarProfComponent', () => {
  let component: NavbarProfComponent;
  let fixture: ComponentFixture<NavbarProfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarProfComponent]
    });
    fixture = TestBed.createComponent(NavbarProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
