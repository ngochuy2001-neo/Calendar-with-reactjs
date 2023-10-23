interface dateFormat {
  date: number;
  month: number;
  year: number;
}

const checkActive = (
  currentMonth: number,
  dateCheck: dateFormat,
  dayStorage: dateFormat[]
) => {
  if (dayStorage.length == 1) {
    const firstDate = new Date(
      dateCheck.year,
      dateCheck.month,
      dateCheck.date
    ).getTime();
    const secondDate = new Date(
      dayStorage[0].year,
      dayStorage[0].month,
      dayStorage[0].date
    ).getTime();

    if (firstDate == secondDate) {
      return "active";
    }
  } else if (dayStorage.length == 2) {
    let beforeDate = new Date(
      dayStorage[0].year,
      dayStorage[0].month,
      dayStorage[0].date
    );
    let afterDate = new Date(
      dayStorage[1].year,
      dayStorage[1].month,
      dayStorage[1].date
    );
    if (beforeDate > afterDate) {
      const temp = afterDate;
      afterDate = beforeDate;
      beforeDate = temp;
    }
    const currentCheckDate = new Date(
      dateCheck.year,
      dateCheck.month,
      dateCheck.date
    );
    const isInTimelime =
      currentCheckDate >= beforeDate && currentCheckDate <= afterDate;
    if (isInTimelime) {
      return "active";
    }
  }
  const isSameMonth = dateCheck.month == currentMonth;
  if (isSameMonth) {
    return "";
  }
  return "inactive";
};

export default checkActive;
