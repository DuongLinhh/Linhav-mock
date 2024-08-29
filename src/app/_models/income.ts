export class Income {
    CompanyName?: string;
    MonthID?: number;
    YearID?: number;
    TotalIncome?: any;
    TotalExpenses?: any;
    CostofSales?: string;
    IgnoreException?: number;
    income?: number;
    profit?: number;
}

export class CompanyData {
  name?: string;
  monthlyData?: any;
}


export class MonthlyData {
  month?: string;
  totalIncome?: any;
  totalExpenses?: any;
  year?: number;
  costOfSales?: number;
}
