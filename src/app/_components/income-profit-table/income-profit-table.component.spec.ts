import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeProfitTableComponent } from './income-profit-table.component';

describe('IncomeProfitTableComponent', () => {
  let component: IncomeProfitTableComponent;
  let fixture: ComponentFixture<IncomeProfitTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeProfitTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeProfitTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
