import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MinuteMarket } from './minute-market';

describe('MinuteMarket', () => {
  let component: MinuteMarket;
  let fixture: ComponentFixture<MinuteMarket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinuteMarket],
    }).compileComponents();

    fixture = TestBed.createComponent(MinuteMarket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
