import { useEffect, useState } from "react";

interface dayReturnFormat {
  date: number, 
  month: number,
  year: number,
  fullDate: string,
  state: string,
}

interface dayFormat {
  currentDay: number,
  month: number,
  year: number,
  fullDate: string,
  state: string,
  handleDayClick: (param: dayReturnFormat) => void,
}


const Days = ({currentDay, month, year, fullDate, state, handleDayClick}: dayFormat) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isInactive, setIsInactive] = useState<boolean>(false);
  
  useEffect(() => {
    if(state == ""){
      setIsInactive(false);
    }else{
      setIsInactive(true);
    }
  },[state])

  const handleClick = () =>{
    handleDayClick({
      date: currentDay,
      month: month,
      year: year,
      fullDate: "10/10/2023",
      state: state
    });
    console.log(state)
    console.log(isInactive)
  }
  return(
    <li onClick={handleClick} className={`w-[70px] h-[60px] flex items-center justify-center hover:bg-blue-600 hover:text-white ${isInactive? "text-gray-300":""}`}>
      {currentDay}
    </li>
  )
}

export default Days;