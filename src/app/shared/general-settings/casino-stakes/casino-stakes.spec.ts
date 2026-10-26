import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CasinoStakes } from './casino-stakes';

describe('CasinoStakes', () => {
  let component: CasinoStakes;
  let fixture: ComponentFixture<CasinoStakes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasinoStakes],
    }).compileComponents();

    fixture = TestBed.createComponent(CasinoStakes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
