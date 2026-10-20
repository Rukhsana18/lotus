import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SPORTS_SIDEBAR_DATA } from '../../data/sports-sidebar.data';
import { Leagues } from './leagues';

describe('Leagues', () => {
  let component: Leagues;
  let fixture: ComponentFixture<Leagues>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Leagues],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Leagues);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the subleagues matching the current sport route', async () => {
    fixture.componentRef.setInput('sportRoute', '/tennis');
    fixture.detectChanges();

    const expectedSubLeagues = SPORTS_SIDEBAR_DATA.find((category) => category.route === '/tennis')!
      .subLeagues!;
    const renderedNames = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('.league-title'),
      (element) => element.textContent?.trim(),
    );

    expect(renderedNames).toEqual(expectedSubLeagues.map((league) => league.name));
  });

  it('builds cricket league links using the cricket detail route', async () => {
    fixture.componentRef.setInput('sportRoute', '/sports');
    fixture.detectChanges();

    const firstLeague = (fixture.nativeElement as HTMLElement).querySelector(
      '.league-row-item',
    ) as HTMLAnchorElement;

    expect(firstLeague.getAttribute('href')).toBe('/sports/league/1');
  });
});
