import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RulesAndRegulations } from './rules-and-regulations';

describe('RulesAndRegulations', () => {
  let component: RulesAndRegulations;
  let fixture: ComponentFixture<RulesAndRegulations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RulesAndRegulations],
    }).compileComponents();

    fixture = TestBed.createComponent(RulesAndRegulations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
