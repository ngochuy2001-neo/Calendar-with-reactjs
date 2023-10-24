export interface IDayFormat {
  date: number,
  month: number,
  year: number,
  fullDate?: string
}

export interface IDayStorage{
  fromDate: Date,
  toDate: Date | null
}