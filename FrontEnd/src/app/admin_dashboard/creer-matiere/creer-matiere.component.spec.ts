import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerMatiereComponent } from './creer-matiere.component';

describe('CreerMatiereComponent', () => {
  let component: CreerMatiereComponent;
  let fixture: ComponentFixture<CreerMatiereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreerMatiereComponent]
    });
    fixture = TestBed.createComponent(CreerMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
