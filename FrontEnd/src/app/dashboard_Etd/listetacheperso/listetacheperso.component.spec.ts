import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListetachepersoComponent } from './listetacheperso.component';

describe('ListetachepersoComponent', () => {
  let component: ListetachepersoComponent;
  let fixture: ComponentFixture<ListetachepersoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListetachepersoComponent]
    });
    fixture = TestBed.createComponent(ListetachepersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
