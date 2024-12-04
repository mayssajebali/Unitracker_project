import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListefiltreeComponent } from './listefiltree.component';

describe('ListefiltreeComponent', () => {
  let component: ListefiltreeComponent;
  let fixture: ComponentFixture<ListefiltreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListefiltreeComponent]
    });
    fixture = TestBed.createComponent(ListefiltreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
