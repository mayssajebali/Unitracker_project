import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesEtudiantsComponent } from './listes-etudiants.component';

describe('ListesEtudiantsComponent', () => {
  let component: ListesEtudiantsComponent;
  let fixture: ComponentFixture<ListesEtudiantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListesEtudiantsComponent]
    });
    fixture = TestBed.createComponent(ListesEtudiantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
