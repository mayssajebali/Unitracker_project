import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListetachesComponent } from './listetaches.component';

describe('ListetachesComponent', () => {
  let component: ListetachesComponent;
  let fixture: ComponentFixture<ListetachesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListetachesComponent]
    });
    fixture = TestBed.createComponent(ListetachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
