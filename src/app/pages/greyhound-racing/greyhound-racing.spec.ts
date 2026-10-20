import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GreyhoundRacing } from './greyhound-racing';

describe('GreyhoundRacing', () => {
  let component: GreyhoundRacing;
  let fixture: ComponentFixture<GreyhoundRacing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreyhoundRacing],
    }).compileComponents();

    fixture = TestBed.createComponent(GreyhoundRacing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
