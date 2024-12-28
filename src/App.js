import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import DonutChart from "./components/Donut";
import Tab from "./components/Tab"
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000);
  const [interestRate, setInterestRate] = useState(12);
  const [years, setYears] = useState(10);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalReturn, setTotalReturn] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [active, setActive] = useState('SIP')

  // Ensure useEffect runs whenever a relevant state changes
  useEffect(() => {
    if (active === 'SIP') {
      calculateSIP(monthlyInvestment, interestRate, years);
    } else {
      calculateLumpsum(monthlyInvestment, interestRate, years);
    }
  }, [active, monthlyInvestment, interestRate, years]);

  // Updated to accept parameters instead of relying on the current state
  const calculateSIP = (principal, rate, duration) => {
    const monthlyRate = rate / 12 / 100;
    const totalMonths = duration * 12;

    // Total amount invested
    const investedAmount = principal * totalMonths;

    // Future value (Total Value)
    const futureValue =
      principal *
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
      (1 + monthlyRate);

    // Estimated returns
    const estimatedReturn = futureValue - investedAmount;

    // Update state
    setTotalInvestment(investedAmount.toFixed(2));
    setTotalReturn(estimatedReturn.toFixed(2));
    setTotalValue(futureValue.toFixed(2));
  };

  const calculateLumpsum = (principal, rate, duration) => {
    const annualRate =  rate / 100

    // future value 
    const futureValue = principal * Math.pow(1+annualRate, duration)

    // interest earned 
    const interstEarned = futureValue - principal

    setTotalInvestment(principal)
    setTotalReturn(interstEarned.toFixed(2))
    setTotalValue(futureValue.toFixed(2))

  }

  const handleMonthlyInvestmentChange = (e) => {
    const monthlyRange = e.target.value * 10000;
    setMonthlyInvestment(monthlyRange);
    if (active === 'SIP') {
    calculateSIP(monthlyRange, interestRate, years); // Fixed to pass updated state
    } else {
      calculateLumpsum(monthlyRange, interestRate, years);
    }
  };

  const handleInterestRateChange = (e) => {
    const updatedRate = e.target.value;
    setInterestRate(updatedRate);
    if (active === 'SIP') {
      calculateSIP(monthlyInvestment, updatedRate, years); // Fixed to pass updated state
      } else {
        calculateLumpsum(monthlyInvestment, updatedRate, years);
      }
  };

  const handleYearChange = (e) => {
    const yearRange = e.target.value / 2;
    setYears(yearRange);
    if (active === 'SIP') {
      calculateSIP(monthlyInvestment, interestRate, yearRange); // Fixed to pass updated state
      } else {
        calculateLumpsum(monthlyInvestment, interestRate, yearRange);
      }
  };

  return (
    <div>
      <div className="mt-10 ml-20 text-3xl font-semibold">SIP Calculator</div>

      <div className="flex justify-center">
        
        <div className="border  border-slate-400 rounded-lg mt-10 min-w-[40vw] min-h-[80vh] p-8">
         {/* tab  */}
        <Tab active={active} setActive={setActive} />
        <div className="mt-4">
     
           <div className="flex gap-[5rem]">
           <div className="">
             <div>
               <div className="flex justify-between">
                 <div className="font-semibold text-md">
                 {active === 'SIP' && <p>Monthly Investment</p>}
                  {active === 'Lumpsum' && <p>Lumpsum Investment</p>}
                  </div>
 
                 <div className="bg-blue-100 p-1 px-2 min-w-[80px] rounded-md font-semibold text-blue-700 flex justify-end">
                   ₹ <span className="ml-2">{monthlyInvestment}</span>
                 </div>
               </div>
 
               <div className="mt-4">
                 <Slider
                   value={monthlyInvestment / 10000}
                   aria-label="Default"
                   onChange={handleMonthlyInvestmentChange} // Updated handler
                 />
               </div>
             </div>
 
             <div className="mt-20">
               <div className="flex justify-between">
                 <div className="font-semibold text-md">
                   Expected Return Rate (per annum)
                 </div>
 
                 <div className="bg-blue-100 p-1 px-2 min-w-[80px] rounded-md font-semibold text-blue-700 flex justify-end">
                   <span className="mr-1">{interestRate}</span> %
                 </div>
               </div>
 
               <div className="mt-4">
                 <Slider
                   value={interestRate}
                   aria-label="Default"
                   onChange={handleInterestRateChange} // Updated handler
                 />
               </div>
             </div>
 
             <div className="mt-20">
               <div className="flex justify-between">
                 <div className="font-semibold text-md">Time Period</div>
 
                 <div className="bg-blue-100 p-1 px-2 min-w-[80px] rounded-md font-semibold text-blue-700 flex justify-end">
                   <span className="mr-1">{years}</span> Yr
                 </div>
               </div>
 
               <div className="mt-4">
                 <Slider
                   value={years * 2}
                   aria-label="Default"
                   onChange={handleYearChange} // Updated handler
                 />
               </div>
             </div>
 
             <div className="mt-20">
               <div className="flex justify-between">
                 <div className="text-md">Invested Amount</div>
 
                 <div className="p-1 px-2 min-w-[80px] rounded-md font-semibold flex justify-end">
                   ₹ <span className="mr-1">{totalInvestment}</span>
                 </div>
               </div>
             </div>
 
             <div className="mt-4">
               <div className="flex justify-between">
                 <div className="">Est. Return</div>
 
                 <div className="p-1 px-2 min-w-[80px] rounded-md font-semibold flex justify-end">
                   ₹ <span className="mr-1">{totalReturn}</span>
                 </div>
               </div>
             </div>
 
             <div className="mt-4">
               <div className="flex justify-between">
                 <div className="">Total Value</div>
 
                 <div className="p-1 px-2 min-w-[80px] rounded-md font-semibold flex justify-end">
                   ₹ <span className="mr-1">{totalValue}</span>
                 </div>
               </div>
             </div>
           </div>
           {/* donut  */}
           <div className="flex">
             {/* <ErrorBoundary > */}
             <DonutChart
               totalInvestment={totalInvestment}
               totalReturn={totalReturn}
             />
             {/* </ErrorBoundary> */}
           </div>
           
           </div>
        
        {/* {active === 'Lumpsum' && <p>Lumpsum Content: Details about Lumpsum.</p>} */}
      </div>

       
        </div>
      </div>
    </div>
  );
}
