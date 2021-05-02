import moment from 'moment'
import { TestDataType } from '../types'

// 날짜 입력 유효성체크
const setValidDateTime = (year: number, month: number, day: number) => {
  const tmpDateStr = `${String(year)}.${makeTwoDigits(
    month + 1,
  )}.${makeTwoDigits(day)}`
  let resultYear = year,
    resultMonth = month,
    resultDay = day

  if (year < 0) resultYear = 1

  if (month < 0) resultMonth = 0
  else if (month > 11) resultMonth = 11

  if (day < 0) resultDay = 1
  else if (day > 26 && !moment(tmpDateStr, 'YYYY.MM.DD', true).isValid()) {
    let dt = 31
    let text = `${resultYear}.${makeTwoDigits(resultMonth + 1)}.${String(dt)}`
    while (!moment(text, 'YYYY.MM.DD', true).isValid()) {
      dt--
      text = `${resultYear}.${makeTwoDigits(resultMonth + 1)}.${String(dt)}`
    }
    resultDay = dt
  }
  return { year: resultYear, month: resultMonth, day: resultDay }
}
export const dateValidator = (input: string): Date | null => {
  const tmp = input.split('.')

  if (tmp.some((t) => isNaN(Number(t))) || tmp.length < 3) return null

  const { year, month, day } = setValidDateTime(
    Number(tmp[0]),
    Number(tmp[1]) - 1,
    Number(tmp[2]),
  )
  return new Date(year, month, day, 0, 0, 0)
}

// Convert integrated formatted string to Date
export const convertToDate = (input: string): Date | null => {
  const strings: string[] = input.split(/[- :]/)
  const arr: number[] = strings.map((str) => Number(str))
  if (arr.some((a) => isNaN(Number(a))) || arr.length < 3) return null

  const { year, month, day } = setValidDateTime(arr[0], arr[1] - 1, arr[2])

  if (arr.length < 6) {
    return new Date(year, month, day, 0, 0, 0)
  }

  const hour = arr[3] > 23 ? 23 : arr[3] < 0 ? 0 : arr[3]
  const min = arr[4] > 59 ? 59 : arr[4] < 0 ? 0 : arr[4]
  const sec = arr[5] > 59 ? 59 : arr[5] < 0 ? 0 : arr[5]
  return new Date(year, month, day, hour, min, sec)
}

// Date class object with integrated format
export const getToday = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')

// Add zero for 1 digit number to string
export const makeTwoDigits = (num: number) => {
  return num < 0 ? '00' : num < 10 ? `0${num}` : String(num).substr(0, 2)
}

// extract year, month, date, disability from calendar date id
export const extractValFromId = (id: string) => {
  const extractedYear = id.substr(0, 4)
  const extractedMonth = id.substr(id.indexOf('-') + 1, 2)
  const extractedDate = id.substr(id.lastIndexOf('-') + 1, 2)
  const disabled = id.indexOf(':disabled') > -1

  return {
    id: extractedYear + '-' + extractedMonth + '-' + extractedDate,
    extractedYear,
    extractedMonth,
    extractedDate,
    disabled,
  }
}

// change year based on month
export const setYear = (year: number, month: number) => {
  return String(month < 0 ? year - 1 : month > 11 ? year + 1 : year)
}

// change month based on month seq
export const setMonth = (month: number) => {
  if (month < -12) return '00'
  else if (month > 12) return '11'
  return makeTwoDigits(month < 0 ? 12 + month : month > 11 ? month - 12 : month)
}

// get day seq based on config seq
export const getBaseSeq = (day: number, base: number) => {
  switch (base) {
    case 0:
      return day
    default:
      const diff = day - base
      return diff < 0 ? 7 + diff : diff
  }
}

// compare two months
export const compareMonth = (day1: Date | string, day2: Date | string) => {
  return moment(day1).format('YYYYMM') === moment(day2).format('YYYYMM')
}

// schedule data in month
export const checkScheduleInMonth = (data: TestDataType, month: Date) => {
  if (data.endDate) {
    return (
      compareMonth(data.endDate, month) || compareMonth(data.startDate, month)
    )
  }
  return compareMonth(data.startDate, month)
}

// consist 5 months base on baseDate
export const consistMonthRange = (baseDate: Date) => {
  const currYear = Number(moment(baseDate).format('YYYY'))
  const currMonth = Number(moment(baseDate).format('MM')) - 1

  return [
    new Date(
      currMonth <= 1 ? currYear - 1 : currYear,
      currMonth - 2 < 0 ? 12 + currMonth - 2 : currMonth - 2,
      1,
    ),
    new Date(
      currMonth === 0 ? currYear - 1 : currYear,
      currMonth - 1 < 0 ? 11 : currMonth - 1,
      1,
    ),
    baseDate,
    new Date(
      currMonth === 11 ? currYear + 1 : currYear,
      currMonth + 1 > 11 ? 0 : currMonth + 1,
      1,
    ),
    new Date(
      currMonth >= 10 ? currYear + 1 : currYear,
      currMonth + 2 > 11 ? currMonth + 2 - 12 : currMonth + 2,
      1,
    ),
  ]
}

// compare two dates
export const compareDate = (day1: Date, day2: Date) => {
  return moment(day1).format('YYYYMMDD') === moment(day2).format('YYYYMMDD')
}

// get date difference count
export const getDiffDayCnt = (day1: Date, day2: Date) => {
  const differenceInTime = Math.abs(day1.getTime() - day2.getTime())
  return Math.round(differenceInTime / (1000 * 3600 * 24))
}

// get first startDate / last endDate (number)
export const getStartEndDateNum = (
  type: 'start' | 'end',
  day1?: Date | string,
  day2?: Date | string,
): number | undefined => {
  if (!day1 && !day2) {
    return undefined
  }
  if (!day1) {
    return Number(moment(day2).format('YYYYMMDD'))
  }
  if (!day2) {
    return Number(moment(day1).format('YYYYMMDD'))
  }

  const first = Number(moment(day1).format('YYYYMMDD'))
  const second = Number(moment(day2).format('YYYYMMDD'))

  if (type === 'start') {
    return first < second ? first : second
  } else {
    return first > second ? first : second
  }
}

// get first startDate / last endDate
export const getStartEndDate = (
  type: 'start' | 'end',
  day1?: Date | string,
  day2?: Date | string,
): Date | undefined => {
  if (!day1 && !day2) {
    return undefined
  }
  if (!day1) {
    return moment(day2).toDate()
  }
  if (!day2) {
    return moment(day1).toDate()
  }

  const first = Number(moment(day1).format('YYYYMMDD'))
  const second = Number(moment(day2).format('YYYYMMDD'))

  if (type === 'start') {
    return moment(first < second ? day1 : day2).toDate()
  } else {
    return moment(first > second ? day1 : day2).toDate()
  }
}

// check whether the daynum is within main schedule range or not
export const checkMainWeek = (data: TestDataType, week: number) => {
  if (!data.subNo) {
    return true
  }

  const startDate = Number(moment(data.startDate).format('YYYYMMDD'))
  if (!data.endDate) {
    return startDate === week
  }
  const endDate = Number(moment(data.endDate).format('YYYYMMDD'))
  return week >= startDate && endDate >= week
}

// Manual calculation of current month & year depend on display week
export const getNewDateUponBeforeOrAfter = (
  year: number,
  month: number,
  day: number,
  beforeOrAfter?: 'before' | 'after',
) => {
  if (beforeOrAfter === 'before') {
    if (month - 1 < 0) {
      return new Date(year - 1, 11, day)
    } else {
      return new Date(year, month - 1, day)
    }
  }
  return new Date(year, month, day)
}
export const getNewDateUponBefore = (
  year: number,
  month: number,
  day: number,
  before?: boolean,
) => {
  if (before) {
    if (month - 1 < 0) {
      return new Date(year - 1, 11, day)
    } else {
      return new Date(year, month - 1, day)
    }
  }
  return new Date(year, month, day)
}

// get appropriate yearMonth
export const getAppropriateYearMonth = (yearMonth: string) => {
  const year = Number(yearMonth.substr(0, 4))
  const month = Number(yearMonth.substr(4, 2)) - 1

  if (month < -13 || month > 24) return ''

  if (month < 0) {
    return String(year - 1) + makeTwoDigits(13 + month)
  } else if (month > 11) {
    return String(year + 1) + makeTwoDigits(month - 11)
  } else {
    return String(year) + makeTwoDigits(month + 1)
  }
}

// Check if current device is mobile
export const checkIsMobile = (globalObj?: {
  navigator: { userAgent: string }
}) => {
  if (typeof globalObj === 'undefined') return false

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    globalObj.navigator.userAgent || '',
  )
}
