import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierTacheComponent } from './modifier-tache.component';

describe('ModifierTacheComponent', () => {
  let component: ModifierTacheComponent;
  let fixture: ComponentFixture<ModifierTacheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierTacheComponent]
    });
    fixture = TestBed.createComponent(ModifierTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
