import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExclusionPolicy } from './exclusion-policy';

describe('ExclusionPolicy', () => {
  let component: ExclusionPolicy;
  let fixture: ComponentFixture<ExclusionPolicy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExclusionPolicy],
    }).compileComponents();

    fixture = TestBed.createComponent(ExclusionPolicy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
