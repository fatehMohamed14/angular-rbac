import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularRbacComponent } from './angular-rbac.component';

describe('AngularRbacComponent', () => {
  let component: AngularRbacComponent;
  let fixture: ComponentFixture<AngularRbacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularRbacComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularRbacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
