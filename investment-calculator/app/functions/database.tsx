export interface StockData {
    symbol: string;
    data: any;
    timestamp: number;
  }
  
  export class StockDB {
    private readonly DB_NAME = 'StocksData';
    private readonly STORE_NAME = 'stockData';
    private readonly DB_VERSION = 1;
    private apiKey = process.env.TWELVEDATA_API_KEY;
  
    private async openDB(): Promise<IDBDatabase> {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);
  
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
  
        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains(this.STORE_NAME)) {
            db.createObjectStore(this.STORE_NAME, { keyPath: 'symbol' });
          }
        };
      });
    }

      // this will fetch the stock data from the API in a monthly interval
  async fetchStockMonthlyData(symbol: String) {
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1month&outputsize=5000&apikey=${this.apiKey}`;
    
    const res = await fetch(url);
    const data = await res.json();
    
    return {
      props: { stockData: data },
    };
  }
  
    async saveStockData(symbol: string, data: any): Promise<void> {
      const db = await this.openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.STORE_NAME], 'readwrite');
        const store = transaction.objectStore(this.STORE_NAME);
  
        const stockData: StockData = {
          symbol,
          data,
          timestamp: Date.now()
        };
  
        const request = store.put(stockData);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
    }
  
    async getStockData(symbol: string): Promise<StockData | null> {
      const db = await this.openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.STORE_NAME], 'readonly');
        const store = transaction.objectStore(this.STORE_NAME);
        const request = store.get(symbol);
  
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result || null);
      });
    }

    private async refreshStockData(symbol: string, apiKey: string) {
        const data = await this.fetchStockMonthlyData(symbol);
        await this.saveStockData(symbol, data);
        return data;
      }
  }