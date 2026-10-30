import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressForm } from './progress-form';

describe('ProgressForm', () => {
  let component: ProgressForm;
  let fixture: ComponentFixture<ProgressForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
