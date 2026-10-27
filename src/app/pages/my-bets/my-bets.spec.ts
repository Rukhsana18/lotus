import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyBets } from './my-bets';

describe('MyBets', () => {
  let component: MyBets;
  let fixture: ComponentFixture<MyBets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyBets],
    }).compileComponents();

    fixture = TestBed.createComponent(MyBets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
