export class Income {
    CompanyName?: string;
    MonthID?: number;
    YearID?: number;
    TotalIncome?: number | string;
    TotalExpenses?: number | string;
    CostofSales?: number | string;
    IgnoreException?: number;
}

export class CompanyData {
  name?: string;
  data?: {
    income?: number | string;
    profit?: number | string;
  }
}