import { StockDB } from "./database";
import sampleData from './sample_data.json';


export class CalculationLogic {
  db = new StockDB();
  
  async calculateInvestment(
    startMonth: number,
    startYear: number,
    investmentYears: number,
    investmentMonths: number,
    initialInvestment: number,
    ticker: string
  ) {
    try {
      const stockData = sampleData;
      if (!stockData?.values) {
        throw new Error('No stock data available');
      }

      const values = stockData.values;
      
      // Find starting index
      const startDate = `${startYear}-${String(startMonth).padStart(2, '0')}-01`;
      const startIndex = values.findIndex((v: { datetime: string; }) => v.datetime.startsWith(startDate));
      
      if (startIndex === -1) {
        throw new Error('Start date not found in data');
      }

      // Calculate end index based on years and months
      const totalMonths = (investmentYears * 12) + investmentMonths;
      const endIndex = startIndex - totalMonths; // Subtract because data is in reverse chronological order
      
      if (endIndex < 0) {
        throw new Error('Requested time period exceeds available data');
      }

      // Get starting and ending prices
      const startPrice = parseFloat(values[startIndex].close);
      const endPrice = parseFloat(values[endIndex].close);

      // Calculate return
      const returnValue = initialInvestment * (endPrice / startPrice);
      const percentageReturn = ((endPrice / startPrice - 1) * 100);

      return {
        initialInvestment,
        finalValue: returnValue,
        totalReturn: returnValue - initialInvestment,
        percentageReturn,
        startDate,
        endDate: values[endIndex].datetime,
        startPrice,
        endPrice
      };
    } catch (error) {
      console.error('Error calculating investment:', error);
      throw error;
    }
  }
}