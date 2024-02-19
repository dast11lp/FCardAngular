import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccounttComponent } from './bank-accountt.component';

describe('BankAccounttComponent', () => {
  let component: BankAccounttComponent;
  let fixture: ComponentFixture<BankAccounttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankAccounttComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankAccounttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
