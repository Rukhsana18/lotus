import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Betslip } from './betslip';

describe('Betslip', () => {
  let component: Betslip;
  let fixture: ComponentFixture<Betslip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Betslip],
    }).compileComponents();

    fixture = TestBed.createComponent(Betslip);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
