'use client';

import { Text } from "@chakra-ui/react";
import { CalculationLogic } from "./functions/calculationLogic";
import { StockDB } from "./functions/database";
import { useState } from "react";
export default function Home() {

  const calculationLogic = new CalculationLogic();
  const database = new StockDB();

  const [initialInvestment, setInitialInvestment] = useState<number>(0);
  const [initialMonth, setInitialMonth] = useState<number>(0);
  const [initialYear, setInitialYear] = useState<number>(0);
  const [numOfYears, setNumOfYears] = useState<number>(0);
  const [numOfMonths, setNumOfMonths] = useState<number>(0);
  const[ticker, setTicker] = useState<string>('');

  const [futureValue, setFutureValue] = useState<number>(0);
  const [interestEarned, setInterestEarned] = useState<number>(0);
  const [amountInvested, setAmountInvested] = useState<number>(0);
  const [avgRateOfInterest, setAvgRateOfInterest] = useState<number>(0);

  const handleCalculate = async () => {
    try {
      console.log(initialMonth, initialYear, numOfYears, numOfMonths, initialInvestment);
      calculationLogic.calculateInvestment(initialMonth, initialYear, numOfYears, numOfMonths, initialInvestment, ticker).then((result) => {
        console.log(result);
        setFutureValue(result.finalValue);
        setInterestEarned(result.totalReturn);
        setAmountInvested(result.initialInvestment);
        setAvgRateOfInterest(result.percentageReturn);
      })
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen font-[family-name:var(--font-kadwa)]">
      <header className="w-full bg-foreground text-white py-10 px-8 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Investment Calculator</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/" className="transition-transform duration-200 hover:scale-110 inline-block">Home</a></li>
              <li><a href="/" className="transition-transform duration-200 hover:scale-110 inline-block">About</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex flex-col pt-20">
        <div className="w-full flex flex-row justify-center items-start px-10">
          <div className="bg-[#401F01] w-[30%] rounded-3xl py-3">
            <div className="title-and-textInput">
              <Text className="text-white">Stock Ticker (for e.g. NVDA)</Text>
              <input
                type="text"
                placeholder="Enter Stock Ticker"
                className="w-full mt-2 p-2 text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="title-and-textInput">
              <Text className="text-white">Initial Investment</Text>
              <input
                type="text"
                placeholder="Initial Investment Amount"
                className="w-full mt-2 p-2 text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                onChange={(e) => setInitialInvestment(Number(e.currentTarget.value))}
              />
            </div>

            <div className="title-and-textInput flex flex-row w-full">
            
              <div className="w-full">
                <Text className="text-white">Initial Year:</Text>
                <select
                  className="w-[90%] mt-2 p-2 text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onChange={(e) => setInitialYear(Number(e.currentTarget.value))}
                >
                  {/* You'll need to add state management for years */}
                  <option value="">Select Year</option>
                  {/* Example of how to map years dynamically */}
                  {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full">
                <Text className="text-white">Initial Month:</Text>
                <select
                  className="w-[90%] mt-2 p-2 rounded-lg border text-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onChange={(e) => setInitialMonth(Number(e.currentTarget.value))}
                >
                  {[...Array(11)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="title-and-textInput flex flex-row w-full">
              <div>
                <Text className="text-white">Years:</Text>
                <input
                  type="text"
                  placeholder="Years"
                  className="w-[90%] mt-2 p-2 text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onInput={(e) => setNumOfYears(Number(e.currentTarget.value))}
                />
              </div>
              <div>
                <Text className="text-white">Months:</Text>
                <input
                  type="text"
                  placeholder="Months"
                  className="w-[90%] mt-2 p-2 text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onInput={(e) => setNumOfMonths(Number(e.currentTarget.value))}
                />
              </div>
            </div>
            <button className="bg-green-300 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-full m-2 float-right mr-10 mt-2" onClick={handleCalculate}>
              Calculate
            </button>
          </div>

          <div className="bg-[#281A0D] flex flex-col rounded-3xl py-3 px-5 ml-10 justify-center items-center">
            <Text className="text-[#DD7311] text-xl">NVDA Calculation for 12 years 0 months from 10/1995</Text>
            <div className="h-[2px] bg-[#494949] w-[80%] my-4" />

            <div className="w-[90%] flex flex-col">
              {/* Row for Future Investment Value and Avg Rate of Interest */}
              <div className="flex flex-row justify-between w-full">
                <div className="results-div">
                  <Text className="text-white">Future Investment Value</Text>
                  <Text className="text-[#E70505] text-3xl font-bold">${futureValue.toFixed(2)}</Text>
                </div>
                <div className="results-div">
                  <Text className="text-white">Total Rate of Interest</Text>
                  <Text className="text-[#B48D02] text-3xl font-bold">{interestEarned.toFixed(2)}%</Text>
                </div>
              </div>
              
              <div className="flex flex-row justify-between w-full">
                <div className="results-div">
                  <Text className="text-white">Total Interest Earned</Text>
                  <Text className="text-[#B48D02] text-3xl font-bold">${interestEarned.toFixed(2)}</Text>
                </div>

                <div className="results-div">
                  <Text className="text-white">Average Rate of Interest</Text>
                  <Text className="text-[#B48D02] text-3xl font-bold">{interestEarned.toFixed(2)}%</Text>
                </div>
              </div>

              <div className="results-div">
                <Text className="text-white">Amount You Have Invested</Text>
                <Text className="text-[#02B4A9] text-3xl font-bold">${amountInvested.toFixed(2)}</Text>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}