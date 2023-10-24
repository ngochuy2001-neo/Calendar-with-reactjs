export interface IDayFormat {
  date: number,
  month: number,
  year: number,
}

export interface IDayStorage{
  fromDate: Date,
  toDate: Date | null
}