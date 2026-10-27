import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferStatement } from './transfer-statement';

describe('TransferStatement', () => {
  let component: TransferStatement;
  let fixture: ComponentFixture<TransferStatement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferStatement],
    }).compileComponents();

    fixture = TestBed.createComponent(TransferStatement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
