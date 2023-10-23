import { useEffect, useState } from "react";
import listingDay from "../../modules/ListingDay";
import Days from "./Days";
interface CalendarDays {
  currentMonth: number;
  currentYear: number;
}

interface dateObjects {
  date: number,
  month: number,
  year: number,
  fullDate: string,
  state: string,
}

interface dayReturnFormat {
  date: number, 
  month: number,
  year: number,
  fullDate: string,
  state: string
}

const CalendarDays = ({currentMonth, currentYear}: CalendarDays) => {

  const [renderMonth, setRenderMonth] = useState<dateObjects[]>();

  useEffect(() => {
    setRenderMonth(listingDay(currentMonth, currentYear));
  },[currentMonth]) 

  const handleDayClick = (dayFormat: dayReturnFormat) => {
    console.log(dayFormat) ;
  }

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
          <Days key={value.fullDate} currentDay={value.date} month={value.month} year={value.year} fullDate={value.fullDate} state={value.state} handleDayClick={handleDayClick}/>
        ))}
      </ul>
    </div> 
  )
}

export default CalendarDays;