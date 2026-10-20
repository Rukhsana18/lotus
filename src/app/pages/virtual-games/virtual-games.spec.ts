import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VirtualGames } from './virtual-games';

describe('VirtualGames', () => {
  let component: VirtualGames;
  let fixture: ComponentFixture<VirtualGames>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualGames],
    }).compileComponents();

    fixture = TestBed.createComponent(VirtualGames);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
