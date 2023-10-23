import { useEffect, useState } from "react";
import listingDay from "../../modules/ListingDay";
import Days from "./Days";
import checkActive from "../../modules/CheckActive";
interface CalendarDays {
  currentMonth: number;
  currentYear: number;
  dayStorage: dayFormat[];
  setDayStorage: (param: dayFormat[]) => void;
  toggleState: boolean;
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

const CalendarDays = ({currentMonth, currentYear, dayStorage, setDayStorage, toggleState}: CalendarDays) => {

  const [renderMonth, setRenderMonth] = useState<dateObjects[]>();
  
  const checkExisted = (dayArray: dayReturnFormat[], compareDay: dayReturnFormat) => {
    for( let i = 0; i < dayArray.length; i ++){
      const oldDay = new Date(dayArray[0].year, dayArray[0].month, dayArray[0].date);
      const newDay = new Date(compareDay.year, compareDay.month, compareDay.date);
      const isSame = oldDay == newDay;

      if(isSame){
        return true;
      }
    }
    return false
  }

  useEffect(() => {
    setRenderMonth(listingDay(currentMonth, currentYear));
  },[currentMonth, dayStorage]) 

  const handleDayClick = (dayFormat: dayReturnFormat) => {
    if(toggleState){
      console.log("check");
      setDayStorage(prev => [...prev, dayFormat])
      if(dayStorage.length == 2){
        setDayStorage(prev => [prev[1], prev[2]]);
      }
    } else{
      setDayStorage([dayFormat])
    }
  }
  console.log(dayStorage)
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
        const state = checkActive(currentMonth, {date: value.date, month: value.month, year: value.year}, dayStorage);
        return (
          <Days key={value.fullDate} currentDay={value.date} month={value.month} state={state} year={value.year} fullDate={value.fullDate} handleDayClick={handleDayClick}/>
        )}
        )}
      </ul>
    </div> 
  )
}

export default CalendarDays;