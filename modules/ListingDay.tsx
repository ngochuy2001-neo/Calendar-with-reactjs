interface dateObjects {
  date: number,
  month: number,
  year: number,
  fullDate: string,
  state: string,
}

const listingDay = (month: number, year: number) => {
    const curMonthFirstDay: number = new Date(year, month, 1).getDay();
    const curMonthLastDay: number = new Date(year, month + 1, 0).getDay();
    const curMonthLastDate: number = new Date(year, month + 1, 0).getDate();
    const prevMonthLastDate: number = new Date(year, month, 0).getDate();

    let calendarNumbers: number[] = []

    let calendarNumberObjects: dateObjects[] = [];

    
    for (let i = curMonthFirstDay; i > 0; i--){
      calendarNumbers.push(prevMonthLastDate - i + 1);
      const isFirstMonth = month == 0;
      calendarNumberObjects.push({
        date: prevMonthLastDate - i + 1,
        month: month - 1,
        year: isFirstMonth? year - 1: year,
        fullDate: `${prevMonthLastDate - i + 1}/${isFirstMonth? 1: month}/${isFirstMonth? year + 1: year}`,
        state: 'inactive'
      })
    }
    for(let i = 1; i <= curMonthLastDate; i++){
      calendarNumbers.push(i);
      calendarNumberObjects.push({
        date: i,
        month: month,
        year: year,
        fullDate: `${i}/${month + 1}/${year}`,
        state: ''
      })
    }
    for(let i = curMonthLastDay; i < 6; i++){
      const isLastMonth = month == 11;
      calendarNumberObjects.push({
        date: i - curMonthLastDay + 1,
        month: month + 1,
        year: isLastMonth? year + 1: year,
        fullDate: `${i - curMonthLastDay + 1}/${isLastMonth? 1: month +2}/${isLastMonth? year + 1: year}`,
        state: 'inactive'
      })
    }
    console.log(calendarNumberObjects)
    return calendarNumberObjects;
}

export default listingDay;