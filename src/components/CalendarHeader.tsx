"use client";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

interface calendarHeaderProps {
  currentMonth: number;
  currentYear: number;
  onChangeMonthBtn: (param: string) => void;
}

export default function CalendarHeader({
  currentMonth,
  currentYear,
  onChangeMonthBtn,
}: calendarHeaderProps) {
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

  return (
    <div className="w-full h-1/6 rounded-t-lg border-b-2 flex items-center justify-between">
      <div className="text-lg ml-3">
        <button
          onClick={() => {
            onChangeMonthBtn("prev");
          }}
          id="prevMonthBtn"
          className="text-gray-500 hover:text-black"
        >
          <MdOutlineArrowBackIosNew />
        </button>
      </div>
      <div id="headerTitles" className=" text-blue-700 font-bold text-lg">
        {MONTHS[currentMonth]}, {currentYear}
      </div>
      <div className="text-lg mr-3">
        <button
          onClick={() => {
            onChangeMonthBtn("next");
          }}
          id="nextMonthButton"
          className="text-gray-500 hover:text-black"
        >
          <MdOutlineArrowForwardIos />
        </button>
      </div>
    </div>
  );
}
