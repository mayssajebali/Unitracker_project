import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreergroupeComponent } from './creergroupe.component';

describe('CreergroupeComponent', () => {
  let component: CreergroupeComponent;
  let fixture: ComponentFixture<CreergroupeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreergroupeComponent]
    });
    fixture = TestBed.createComponent(CreergroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
