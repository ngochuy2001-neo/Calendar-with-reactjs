import { useEffect, useState } from "react";
import listingDay from "../../modules/ListingDay";
interface CalendarDays {
  currentMonth: number;
  currentYear: number;
}

const CalendarDays = ({currentMonth, currentYear}: CalendarDays) => {

  const [renderMonth, setRenderMonth] = useState<number[]>();

  useEffect(() => {
    setRenderMonth(listingDay(currentMonth, currentYear));
  },[currentMonth]) 

  console.log(renderMonth)
  return(
    <div className="flex justify-around flex-col">
      <ul className="grid grid-cols-7">
        <li className="w-[70px] flex justify-center items-center h-[50px]">Sun</li>
        <li className="w-[70px] flex justify-center items-center h-[50px]">Mon</li>
        <li className="w-[70px] flex justify-center items-center h-[50px]">Tue</li>
        <li className="w-[70px] flex justify-center items-center h-[50px]">Wed</li>
        <li className="w-[70px] flex justify-center items-center h-[50px]">Thu</li>
        <li className="w-[70px] flex justify-center items-center h-[50px]">Fri</li>
        <li className="w-[70px] flex justify-center items-center h-[50px]">Sar</li>
      </ul>
      <ul className="grid grid-cols-7">
        {renderMonth?.map((value, index) => (
          <li key={index} className="w-[70px] h-[60px] flex items-center justify-center hover:bg-blue-600 hover:text-white">{value}</li>
        ))}
      </ul>
    </div> 
  )
}

export default CalendarDays;