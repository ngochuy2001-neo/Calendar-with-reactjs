"use client"
import CalendarDays from "@/components/CalendarDays";
import CalendarFooter from "@/components/CalendarFooter";
import CalendarHeader from "@/components/CalendarHeader"
import { useEffect, useState } from "react";
export default function Home() {
  
  const MONTHS: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ] 

  let currentTime: Date = new Date();
  
  const [currentMonth, setCurrentMonth] = useState<number>(9)
  const [currentYear, setCurrentYear] = useState<number>(2023);

  useEffect(() => {
    let currentDate:Date = new Date();
    setCurrentMonth(currentDate.getMonth())
    setCurrentYear(currentDate.getFullYear())
  },[])

  const handleChangeMonthBtn = (type: string) => {
    const isFirstMonth: boolean = currentMonth == 0;
    const isLastMonth: boolean = currentMonth == 11;
    switch(type){
      case "prev":
        if(isFirstMonth) {
          setCurrentMonth(11);
          setCurrentYear(prevState => prevState - 1);
        } else{
          setCurrentMonth(prevState => prevState - 1);
        }
        break;
      case "next":
        if(isLastMonth) {
          setCurrentMonth(0);
          setCurrentYear(prevState => prevState + 1);
        } else{
          setCurrentMonth(prevState => prevState + 1);
        }
        break;
    }
  }


  return (
    <div className='bg-gradient-to-br from-blue-950 to-blue-800 w-screen h-screen flex justify-center items-center'>
      <div className='bg-white w-[500px] h-[500px] rounded-lg shadow-lg shadow-gray-400'>
        <CalendarHeader currentMonth={currentMonth} currentYear={currentYear} onChangeMonthBtn={handleChangeMonthBtn}/>
        <CalendarDays currentMonth={currentMonth} currentYear={currentYear}/>
      </div>
      <div>

      </div>
    </div>
  )
}
