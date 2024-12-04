import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTacheComponent } from './update-tache.component';

describe('UpdateTacheComponent', () => {
  let component: UpdateTacheComponent;
  let fixture: ComponentFixture<UpdateTacheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTacheComponent]
    });
    fixture = TestBed.createComponent(UpdateTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
