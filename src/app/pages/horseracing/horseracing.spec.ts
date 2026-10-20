import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Horseracing } from './horseracing';

describe('Horseracing', () => {
  let component: Horseracing;
  let fixture: ComponentFixture<Horseracing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Horseracing],
    }).compileComponents();

    fixture = TestBed.createComponent(Horseracing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
