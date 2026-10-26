import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OneClickBetting } from './one-click-betting';

describe('OneClickBetting', () => {
  let component: OneClickBetting;
  let fixture: ComponentFixture<OneClickBetting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneClickBetting],
    }).compileComponents();

    fixture = TestBed.createComponent(OneClickBetting);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
