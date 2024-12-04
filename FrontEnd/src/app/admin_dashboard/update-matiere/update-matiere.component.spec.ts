import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateMatiereComponent } from './update-matiere.component';



describe('UpdateMatiereComponent', () => {
  let component: UpdateMatiereComponent;
  let fixture: ComponentFixture<UpdateMatiereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMatiereComponent]
    });
    fixture = TestBed.createComponent(UpdateMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
