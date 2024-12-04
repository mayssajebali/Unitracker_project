import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerTacheComponent } from './creer-tache.component';

describe('CreerTacheComponent', () => {
  let component: CreerTacheComponent;
  let fixture: ComponentFixture<CreerTacheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreerTacheComponent]
    });
    fixture = TestBed.createComponent(CreerTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
