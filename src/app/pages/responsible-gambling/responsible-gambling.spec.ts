import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponsibleGambling } from './responsible-gambling';

describe('ResponsibleGambling', () => {
  let component: ResponsibleGambling;
  let fixture: ComponentFixture<ResponsibleGambling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsibleGambling],
    }).compileComponents();

    fixture = TestBed.createComponent(ResponsibleGambling);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
