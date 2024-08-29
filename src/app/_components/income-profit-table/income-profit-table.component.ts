import { Component } from '@angular/core';
import { Subject, catchError, of, takeUntil } from 'rxjs';
import { CompanyData, Income } from 'src/app/_models/income';
import { DataService } from 'src/app/_services/data.service';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-income-profit-table',
  templateUrl: './income-profit-table.component.html',
  styleUrls: ['./income-profit-table.component.scss']
})
export class IncomeProfitTableComponent {
  public ngUnsubcribe = new Subject();
  incomeList: Income[] = [];
  months: string[] = [];
  companyData: any;
  income?: number = 0;
  profit?: number = 0;

  constructor(
    private dataService: DataService,
  ) {
    
  }

  ngOnInit() {
    this.getData();
    this.generateLast12Months();
  }

  generateLast12Months() {
    const currentMonth = moment();
    for (let i = 1; i <= 12; i++) {
      this.months.unshift(currentMonth.clone().subtract(i, 'months').format('MMMM'));
    }
    this.months.sort((a, b) => moment(a, 'MMMM').diff(moment(b, 'MMMM')));
  }

  makeIncome() {

  }

  makeProfit() {

  }

  getData() {
    this.dataService.getAllData().pipe(
      takeUntil(this.ngUnsubcribe),
      catchError(err => {
        return of(err);
      })
    ).subscribe(res => {
      let dataFilter = this.removeDuplicatesById(res);
      console.log('aa', dataFilter);
      
      dataFilter.forEach((item: Income) => {
        let company = {
          name: item.CompanyName,
          // data: [
          //   this.months: { income: this.income, profit: this.profit },
          // ]
          data: {
            'January 2024': { income: 100000, profit: 20000 },
            'February 2024': { income: 120000, profit: 22000 },
          }
        };
        this.companyData.push(company);
      });
    })
  }

  removeDuplicatesById(array: any[]): any[] {
    const uniqueArray = array.reduce((accumulator, current) => {
      if (!accumulator.some((item: Income) => (item.CompanyName === current.CompanyName) 
        && (item.MonthID === current.MonthID) 
        && (item.YearID === current.YearID) 
        && (item.TotalIncome === current.TotalIncome || item.TotalExpenses === current.TotalExpenses ))
      ) {
        accumulator.push(current);
      }
      return accumulator;
    }, []);

    return uniqueArray;
  }

  onIncomeTooltip(element: any): string {
    if (element.income === 0 || element.income === null) {
      return 'Data not Captured';
    } else if (element.incomeSurge) {
      return 'Revenue Surge';
    }
    return '';
  }

  onProfitTooltip(element: any): string {
    if (element.profitDrop) {
      return 'Extreme Profit Drop';
    }
    return '';
  }
}
