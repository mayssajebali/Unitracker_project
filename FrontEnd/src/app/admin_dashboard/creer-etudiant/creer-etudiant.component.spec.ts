import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerEtudiantComponent } from './creer-etudiant.component';

describe('CreerEtudiantComponent', () => {
  let component: CreerEtudiantComponent;
  let fixture: ComponentFixture<CreerEtudiantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreerEtudiantComponent]
    });
    fixture = TestBed.createComponent(CreerEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
