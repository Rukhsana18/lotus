import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BettingProfitLoss } from './betting-profit-loss';

describe('BettingProfitLoss', () => {
  let component: BettingProfitLoss;
  let fixture: ComponentFixture<BettingProfitLoss>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BettingProfitLoss],
    }).compileComponents();

    fixture = TestBed.createComponent(BettingProfitLoss);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
