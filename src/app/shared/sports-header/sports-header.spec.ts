import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SportsHeader } from './sports-header';

describe('SportsHeader', () => {
  let component: SportsHeader;
  let fixture: ComponentFixture<SportsHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportsHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(SportsHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the supplied page title and emits tab changes', () => {
    fixture.componentRef.setInput('pageTitle', 'Tennis');
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('.page-title') as HTMLElement;
    expect(title.textContent).toBe('Tennis');

    const changedTabs: ('live' | 'leagues')[] = [];
    component.activeTabChange.subscribe((tab) => changedTabs.push(tab));
    const tabButtons = fixture.nativeElement.querySelectorAll('.tab-btn') as NodeListOf<HTMLButtonElement>;
    tabButtons[1].click();
    fixture.detectChanges();

    expect(changedTabs).toEqual(['leagues']);
    expect(tabButtons[1].classList.contains('active')).toBe(true);
  });

  it('emits a back event when the back button is clicked', () => {
    let backEvents = 0;
    component.back.subscribe(() => backEvents++);

    const backButton = fixture.nativeElement.querySelector('.back-btn') as HTMLButtonElement;
    backButton.click();

    expect(backEvents).toBe(1);
  });
});
