"use client";
import CalendarDays from "@/components/CalendarDays";
import CalendarFooter from "@/components/CalendarFooter";
import CalendarHeader from "@/components/CalendarHeader";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import { alpha, styled } from "@mui/material";
import { yellow } from "@mui/material/colors";

const YellowSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: yellow[600],
    "&:hover": {
      backgroundColor: alpha(yellow[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: yellow[600],
  },
}));

interface dayFormat {
  date: number;
  month: number;
  year: number;
  fullDate: string;
}

export default function Home() {
  const [isToggle, setIsToggle] = useState(false);

  const [dayStorage, setDayStorage] = useState<dayFormat[]>([]);

  const MONTHS: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentTime: Date = new Date();

  const [currentMonth, setCurrentMonth] = useState<number>(9);
  const [currentYear, setCurrentYear] = useState<number>(2023);

  useEffect(() => {
    let currentDate: Date = new Date();
    setCurrentMonth(currentDate.getMonth());
    setCurrentYear(currentDate.getFullYear());
  }, []);

  const [displayZoneValue, setDisplayZoneValue] = useState<string>("");

  useEffect(() => {
    if (dayStorage.length == 1) {
      setDisplayZoneValue(dayStorage[0].fullDate);
    }else if(dayStorage.length == 2) {
      const firstDay = new Date(dayStorage[0].year, dayStorage[0].month, dayStorage[0].date);
      const secondDay = new Date(dayStorage[1].year, dayStorage[1].month, dayStorage[1].date);
      if (firstDay > secondDay){
        setDisplayZoneValue(`${dayStorage[1].fullDate} - ${dayStorage[0].fullDate}`);
      }
      else{
        setDisplayZoneValue(`${dayStorage[0].fullDate} - ${dayStorage[1].fullDate}`);
      }
    } else {
      setDisplayZoneValue("");
    }
    console.log(dayStorage)
  }, [dayStorage]);

  //Event handler
  const handleChangeSwitch = () => {
    setIsToggle((prevState) => !prevState);
    setDisplayZoneValue("");
    setDayStorage([]);
  };

  const handleClearButton = () => {
    setDayStorage([]);
    setDisplayZoneValue("");
  };

  const handleChangeMonthBtn = (type: string) => {
    const isFirstMonth: boolean = currentMonth == 0;
    const isLastMonth: boolean = currentMonth == 11;
    switch (type) {
      case "prev":
        if (isFirstMonth) {
          setCurrentMonth(11);
          setCurrentYear((prevState) => prevState - 1);
        } else {
          setCurrentMonth((prevState) => prevState - 1);
        }
        break;
      case "next":
        if (isLastMonth) {
          setCurrentMonth(0);
          setCurrentYear((prevState) => prevState + 1);
        } else {
          setCurrentMonth((prevState) => prevState + 1);
        }
        break;
    }
  };
  return (
    <div className="bg-gradient-to-br from-blue-950 to-blue-800 w-screen h-screen flex flex-col justify-center items-center">
      <div className="bg-white w-[500px] h-[500px] rounded-lg shadow-lg shadow-gray-400">
        <CalendarHeader
          currentMonth={currentMonth}
          currentYear={currentYear}
          onChangeMonthBtn={handleChangeMonthBtn}
        />
        <CalendarDays
          currentMonth={currentMonth}
          currentYear={currentYear}
          dayStorage={dayStorage}
          setDayStorage={setDayStorage}
          toggleState={isToggle}
        />
      </div>
      <div className=" w-[500px] flex justify-between mt-3">
        <p
          className="w-[430px] h-[50px] bg-white text-lg flex justify-center items-center"
          id="displayZone"
        >
          {displayZoneValue}
        </p>
        <button
          onClick={handleClearButton}
          className="w-[50px] text-lg text-white h-[50px] bg-red-600 flex justify-center items-center hover:bg-white hover:text-red-600"
        >
          <MdDeleteForever />
        </button>
      </div>
      <div className="text-white">
        Multiple choice
        <YellowSwitch onChange={handleChangeSwitch} />
      </div>
    </div>
  );
}
