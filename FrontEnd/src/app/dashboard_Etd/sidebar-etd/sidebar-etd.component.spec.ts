import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarEtdComponent } from './sidebar-etd.component';

describe('SidebarEtdComponent', () => {
  let component: SidebarEtdComponent;
  let fixture: ComponentFixture<SidebarEtdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarEtdComponent]
    });
    fixture = TestBed.createComponent(SidebarEtdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
