import { useEffect, useState } from "react";
import listingDay from "../../modules/ListingDay";
import Days from "./Days";
import checkActive from "../../modules/CheckActive";
interface CalendarDays {
  currentMonth: number;
  currentYear: number;
  dayStorage: dayFormat[];
  setDayStorage: (param: dayFormat[]) => void;
}

interface dateObjects {
  date: number,
  month: number,
  year: number,
  fullDate: string,
}

interface dayReturnFormat {
  date: number, 
  month: number,
  year: number,
  fullDate: string,
}

interface dateFormat {
  date: number, 
  month: number,
  year: number,
}

interface dayFormat {
  date: number,
  month: number,
  year: number,
  fullDate: string
}

const CalendarDays = ({currentMonth, currentYear, dayStorage, setDayStorage}: CalendarDays) => {

  const [renderMonth, setRenderMonth] = useState<dateObjects[]>();

  useEffect(() => {
    setRenderMonth(listingDay(currentMonth, currentYear));
  },[currentMonth]) 

  const handleDayClick = (dayFormat: dayReturnFormat) => {
    setDayStorage([dayFormat])
    console.log(dayFormat)
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
        {renderMonth?.map((value, index) => {
        const state = checkActive(currentMonth, {date: value.date, month: value.month, year: value.month}, dayStorage);
        return (
          <Days key={value.fullDate} currentDay={value.date} month={value.month} state={state} year={value.year} fullDate={value.fullDate} handleDayClick={handleDayClick}/>
        )}
        )}
      </ul>
    </div> 
  )
}

export default CalendarDays;