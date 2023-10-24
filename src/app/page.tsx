"use client";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import { alpha, styled } from "@mui/material";
import { yellow } from "@mui/material/colors";
import { checkActive, listingDay } from "@/utils/helpers";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IDayFormat, IDayStorage } from "@/utils/interfaces";

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

export default function Home() {
  const [isToggle, setIsToggle] = useState(false);
  const [dayStorage, setDayStorage] = useState<IDayStorage | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const [daysOfMonth, setDaysOfMonth] = useState<IDayFormat[]>([]);
  const [displayZoneValue, setDisplayZoneValue] = useState<string | null>("");

  useEffect(() => {
    setDaysOfMonth(listingDay(currentMonth, currentYear));
  }, [currentMonth]);

  const handleDayClick = (clickedDate: Date) => {
    setDayStorage((prevStorage) => {
      if (dayStorage == null) {
        const updatedDayStorage: IDayStorage = {
          fromDate: clickedDate,
          toDate: null,
        };
        return updatedDayStorage;
      }
      if (isToggle) {
        if (clickedDate < dayStorage.fromDate && prevStorage != null) {
          const updatedDayStorage: IDayStorage = {
            fromDate: clickedDate,
            toDate: prevStorage.fromDate,
          };
          return updatedDayStorage;
        } else if (clickedDate == dayStorage.fromDate) {
          const updatedDayStorage: IDayStorage = {
            fromDate: clickedDate,
            toDate: null,
          };
          return updatedDayStorage;
        }
        if (prevStorage?.fromDate) {
          const updatedDayStorage: IDayStorage = {
            fromDate: prevStorage?.fromDate,
            toDate: clickedDate,
          };
          return updatedDayStorage;
        }
        return prevStorage;
      }
      const updatedDayStorage: IDayStorage = {
        fromDate: clickedDate,
        toDate: null,
      };
      return updatedDayStorage;
    });
  };

  const handleUpdateStorage = () => {
    if (dayStorage == null) {
      return "";
    }
    if (dayStorage.toDate == null) {
      return;
    }
  };

  const handleDisplayStorage = (dayStorage: IDayStorage) => {
    if (dayStorage.toDate == null) {
      return `${dayStorage.fromDate.getDate()}/${dayStorage.fromDate.getMonth()}/${dayStorage.fromDate.getFullYear()}`;
    }
    return `${dayStorage.fromDate.getDate()}/${dayStorage.fromDate.getMonth()}/${dayStorage.fromDate.getFullYear()} - ${dayStorage.toDate.getDate()}/${dayStorage.toDate.getMonth()}/${dayStorage.toDate.getFullYear()}`;
  };

  const handleChangeSwitch = () => {
    setIsToggle((prevState) => !prevState);
    if (dayStorage != null) {
      setDayStorage((prevStorage) => {
        const updatedDayStorage: IDayStorage = {
          fromDate: prevStorage?.fromDate,
          toDate: null,
        };
        return updatedDayStorage;
      });
    }
  };

  const handleClearButton = () => {
    setDayStorage(null);
  };

  const handleChangeMonthBtn = (type: string) => {
    const isFirstMonth: boolean = currentMonth == 0;
    const isLastMonth: boolean = currentMonth == 11;
    setCurrentMonth((prevMonth) => {
      switch (type) {
        case "prev":
          if (isFirstMonth) {
            setCurrentYear((prevYear) => prevYear - 1);
            return 11;
          }
          return prevMonth - 1;
          break;
        case "next":
          if (isLastMonth) {
            setCurrentYear((prevYear) => prevYear + 1);
            return 0;
          }
          return prevMonth + 1;
        default:
          return 0;
      }
    });
  };

  return (
    <div className="bg-gradient-to-br from-blue-950 to-blue-800 w-screen h-screen flex flex-col justify-center items-center">
      <div className="bg-white h-[450px] w-[400px]">
        <div className="h-[70px] w-full flex text-xl justify-between items-center border-b-2 border-red-600">
          <button
            onClick={() => {
              handleChangeMonthBtn("prev");
            }}
            className="ml-[10px]"
          >
            <IoIosArrowBack />
          </button>
          {MONTHS[currentMonth] + ", " + currentYear}
          <button
            onClick={() => {
              handleChangeMonthBtn("next");
            }}
            className="mr-[10px]"
          >
            <IoIosArrowForward />
          </button>
        </div>
        <div className="flex flex-col justify-start h-[380px]">
          <ul className="grid grid-cols-7 gap-1">
            <li className="flex items-center justify-center w-[50px] h-[50px]">
              Sun
            </li>
            <li className="flex items-center justify-center w-[50px] h-[50px]">
              Mon
            </li>
            <li className="flex items-center justify-center w-[50px] h-[50px]">
              Tue
            </li>
            <li className="flex items-center justify-center w-[50px] h-[50px]">
              Wed
            </li>
            <li className="flex items-center justify-center w-[50px] h-[50px]">
              Thu
            </li>
            <li className="flex items-center justify-center w-[50px] h-[50px]">
              Fri
            </li>
            <li className="flex items-center justify-center w-[50px] h-[50px]">
              Sat
            </li>
          </ul>
          <ul className="grid grid-cols-7 gap-1 mt-1">
            {daysOfMonth.map((data, index) => (
              <li
                onClick={() => {
                  handleDayClick(new Date(data.year, data.month, data.date));
                }}
                className={checkActive(
                  currentMonth,
                  new Date(data.year, data.month, data.date),
                  dayStorage
                )}
                key={index}
              >
                {data.date}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className=" w-[400px] flex justify-between mt-3">
        <p
          className="w-[330px] h-[50px] bg-white text-lg flex justify-center items-center"
          id="displayZone"
        >
          {dayStorage != null ? handleDisplayStorage(dayStorage) : ""}
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
