import { Component } from '@angular/core';
import { Subject, catchError, of, takeUntil } from 'rxjs';
import { CompanyData, Income, MonthlyData } from 'src/app/_models/income';
import { DataService } from 'src/app/_services/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-income-profit-table',
  templateUrl: './income-profit-table.component.html',
  styleUrls: ['./income-profit-table.component.scss'],
})
export class IncomeProfitTableComponent {
  public ngUnsubcribe = new Subject();
  companies: CompanyData[] = [];
  months: string[] = [];

  constructor(
    private dataService: DataService,
  ) {
    
  }

  ngOnInit() {
    this.getData();
    this.generateLastMonths();
  }

  // make last 12 months
  generateLastMonths() {
    const currentMonth = moment();
    for (let i = 1; i <= 12; i++) {
      this.months.unshift(currentMonth.clone().subtract(i, 'months').format('MMMM'));
    }
    this.months.sort((a, b) => moment(a, 'MMMM').diff(moment(b, 'MMMM')));
  }

  // get all data
  getData() {
    this.dataService.getAllData().pipe(
      takeUntil(this.ngUnsubcribe),
      catchError(err => {
        return of(err);
      })
    ).subscribe(res => {
      let dataFilter = this.removeDuplicates(res);
      this.companies = this.mapDataToCompanies(dataFilter);
    })
  }

  //map data to new format
  mapDataToCompanies(data: any[]): CompanyData[] {
    const companiesMap: { [key: string]: MonthlyData[] } = {};

    data.forEach(item => {
      let month;
      this.months.forEach(res => {
        month = res;
      });
      const year = item.YearID;
      const totalIncome = item.TotalIncome;
      const totalExpenses = item.TotalExpenses;
      const costOfSales = item.CostofSales;

      const monthlyData: MonthlyData = {
        month,
        year,
        totalIncome,
        totalExpenses,
        costOfSales
      };

      if (!companiesMap[item.CompanyName]) {
        companiesMap[item.CompanyName] = [];
      }
      companiesMap[item.CompanyName].push(monthlyData);
    });

    return Object.keys(companiesMap).map(companyName => ({
      name: companyName,
      monthlyData: companiesMap[companyName]
    }));
  }

  //make % change
  calculatePercentChanges() {
    this.companies.forEach(company => {
      company?.monthlyData.forEach((data: any, index: number, arr: any) => {
        if (index > 0) {
          const prev = arr[index - 1];
          if (prev.totalIncome && data.totalIncome) {
            const incomeChange = ((data.totalIncome - prev.totalIncome) / prev.totalIncome) * 100;
            data.percentChangeIncome = incomeChange.toFixed(2) + '%';

            if (incomeChange > 300) {
              data.percentChangeIncome += ' (Revenue Surge)';
            }
          }
          if (prev.totalExpenses && data.totalExpenses) {
            const profitChange = ((data.totalIncome - data.totalExpenses) - (prev.totalIncome - prev.totalExpenses)) / (prev.totalIncome - prev.totalExpenses) * 100;
            data.percentChangeProfit = profitChange.toFixed(2) + '%';

            if (profitChange < -100) {
              data.percentChangeProfit += ' (Extreme Profit Drop)';
            }
          }
          if (data.totalIncome === prev.totalIncome && data.totalExpenses === prev.totalExpenses) {
            data.percentChangeIncome = 'Identical Income and Expenses';
          }
        }

        if (data.totalIncome === 0 || data.totalIncome === null) {
          data.percentChangeIncome = 'Data not Captured';
        }
      });
    });
  }

  //remove duplicate data
  removeDuplicates(array: any[]): any[] {
    const uniqueArray = array.reduce((accumulator, current) => {
      if (!accumulator.some((item: Income) => (item.CompanyName === current.CompanyName) 
        && (item.MonthID === current.MonthID) 
        && (item.YearID === current.YearID))
      ) {
        accumulator.push(current);
      }
      return accumulator;
    }, []);

    return uniqueArray;
  }
}
