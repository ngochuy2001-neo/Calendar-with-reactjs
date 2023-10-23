interface dateFormat{
  date: number,
  month: number, 
  year: number,
}

const checkActive = (currentMonth: number, dateCheck: dateFormat, dayStorage: dateFormat[]) =>{
  if (dayStorage.length == 1){
    const firstDate = new Date(dateCheck.year, dateCheck.month, dateCheck.date);
    const secondDate = new Date(dateCheck.year, dateCheck.month, dateCheck.date);  
    if(firstDate == secondDate) {
      return "active"
    }
  } else if (dayStorage.length == 2){
  }
  const isSameMonth = dateCheck.month == currentMonth
  if(isSameMonth){
    return "" 
  }
  return "inactive" 
}

export default checkActive