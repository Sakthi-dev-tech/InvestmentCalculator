'use client';

import { Text } from "@chakra-ui/react";
export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen font-[family-name:var(--font-kadwa)]">
      <header className="w-full bg-foreground text-white py-10 px-8 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Investment Calculator</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/" className="transition-transform duration-200 hover:scale-110 inline-block">Home</a></li>
              <li><a href="/" className="transition-transform duration-200 hover:scale-110 inline-block">About</a></li>
              <li><a href="/" className="transition-transform duration-200 hover:scale-110 inline-block">Contact</a></li>
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
                className="w-full mt-2 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="title-and-textInput">
              <Text className="text-white">Initial Investment</Text>
              <input
                type="text"
                placeholder="Initial Investment Amount"
                className="w-full mt-2 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="title-and-textInput">
              <Text className="text-white">Start Date</Text>
              <input
                type="text"
                placeholder="Starting Date"
                className="w-full mt-2 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="title-and-textInput flex flex-row w-full">
              <div>
                <Text className="text-white">Years:</Text>
                <input
                  type="text"
                  placeholder="Years"
                  className="w-[90%] mt-2 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <Text className="text-white">Months:</Text>
                <input
                  type="text"
                  placeholder="Months"
                  className="w-[90%] mt-2 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            <button className="bg-green-300 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-full m-2 float-right mr-10 mt-2">
              Calculate
            </button>
          </div>

          <div className="bg-[#281A0D] flex flex-col rounded-3xl py-3 px-5 ml-10 justify-center items-center">
            <Text className="text-[#DD7311] text-xl">NVDA Calculation for 12 years 0 months from 12/10/1995</Text>
            <div className="h-[2px] bg-[#494949] w-[80%] my-4" />

            <div className="w-[90%] flex flex-col">
              {/* Row for Future Investment Value and Avg Rate of Interest */}
              <div className="flex flex-row justify-between w-full">
                <div className="results-div">
                  <Text className="text-white">Future Investment Value</Text>
                  <Text className="text-[#E70505] text-3xl font-bold">$1,000,000.16</Text>
                </div>
                <div className="results-div">
                  <Text className="text-white">Average Rate of Interest</Text>
                  <Text className="text-[#B48D02] text-3xl font-bold">5.76%</Text>
                </div>
              </div>

              <div className="results-div">
                <Text className="text-white">Total Interest Earned</Text>
                <Text className="text-[#B48D02] text-3xl font-bold">$1,000,000.16</Text>
              </div>

              <div className="results-div">
                <Text className="text-white">Amount You Have Invested</Text>
                <Text className="text-[#02B4A9] text-3xl font-bold">$1,000,000.16</Text>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}