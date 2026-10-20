import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MixedMartialArts } from './mixed-martial-arts';

describe('MixedMartialArts', () => {
  let component: MixedMartialArts;
  let fixture: ComponentFixture<MixedMartialArts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MixedMartialArts],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MixedMartialArts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
