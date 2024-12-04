import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignerTacheComponent } from './assigner-tache.component';

describe('AssignerTacheComponent', () => {
  let component: AssignerTacheComponent;
  let fixture: ComponentFixture<AssignerTacheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignerTacheComponent]
    });
    fixture = TestBed.createComponent(AssignerTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
