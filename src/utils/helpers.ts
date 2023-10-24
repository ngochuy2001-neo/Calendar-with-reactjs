import { IDayFormat, IDayStorage } from "./interfaces"

export const listingDay = (month: number, year: number) => {
  const curMonthFirstDay: number = new Date(year, month, 1).getDay();
  const curMonthLastDay: number = new Date(year, month + 1, 0).getDay();
  const curMonthLastDate: number = new Date(year, month + 1, 0).getDate();
  const prevMonthLastDate: number = new Date(year, month, 0).getDate();

  let calendarNumbers: number[] = [];

  let calendarNumberObjects: IDayFormat[] = [];

  for (let i = curMonthFirstDay; i > 0; i--) {
    const isFirstMonth = month == 0;
    calendarNumberObjects.push({
      date: prevMonthLastDate - i + 1,
      month: isFirstMonth ? 11 : month - 1,
      year: isFirstMonth ? year - 1 : year,
    });
  }
  for (let i = 1; i <= curMonthLastDate; i++) {
    calendarNumbers.push(i);
    calendarNumberObjects.push({
      date: i,
      month: month,
      year: year,
    });
  }
  for (let i = curMonthLastDay; i < 6; i++) {
    const isLastMonth = month == 11;
    calendarNumberObjects.push({
      date: i - curMonthLastDay + 1,
      month: isLastMonth ? 0 : month + 1,
      year: isLastMonth ? year + 1 : year,
    });
  }
  return calendarNumberObjects;
};

export const checkActive = (
  currentMonth: number,
  dateCheck: Date,
  dayStorage: IDayStorage | null
) => {
  const dayStyled = "hover:bg-red-600 hover:text-white cursor-default flex items-center justify-center w-[50px] h-[50px]"
  if (dayStorage != null){
    if(dayStorage.toDate != null){
      const isActive = dateCheck >= dayStorage.fromDate && dateCheck <= dayStorage.toDate;
      if(isActive){
        return dayStyled + " bg-red-600 text-white";
      }
    }
    const isActive = dateCheck.getTime() == dayStorage.fromDate.getTime()
    if(isActive){
      return dayStyled + " bg-red-600 text-white";
    }
  }
  const isNormalDayInMonth = dateCheck.getMonth() == currentMonth;
  if(isNormalDayInMonth) {
    return dayStyled
  }
  return "text-blue-300 " + dayStyled
};
