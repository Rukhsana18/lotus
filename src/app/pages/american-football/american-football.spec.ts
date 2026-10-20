import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AmericanFootball } from './american-football';

describe('AmericanFootball', () => {
  let component: AmericanFootball;
  let fixture: ComponentFixture<AmericanFootball>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmericanFootball],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AmericanFootball);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
