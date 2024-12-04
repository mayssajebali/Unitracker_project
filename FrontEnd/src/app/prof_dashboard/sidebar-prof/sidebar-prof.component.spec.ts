import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarProfComponent } from './sidebar-prof.component';

describe('SidebarProfComponent', () => {
  let component: SidebarProfComponent;
  let fixture: ComponentFixture<SidebarProfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarProfComponent]
    });
    fixture = TestBed.createComponent(SidebarProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
