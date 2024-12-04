import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesProfComponent } from './listes-prof.component';

describe('ListesProfComponent', () => {
  let component: ListesProfComponent;
  let fixture: ComponentFixture<ListesProfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListesProfComponent]
    });
    fixture = TestBed.createComponent(ListesProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
