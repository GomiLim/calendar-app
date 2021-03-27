import moment from 'moment'
import { TestDataType } from '../../pages/api'

// 날짜 입력 유효성체크
export const dateValidator = (input: string): Date => {
  const tmp = input.split('.')

  if (Number(tmp[0]) < 2000) tmp[0] = '2000'

  if (Number(tmp[1]) === 0) tmp[1] = '01'
  else if (Number(tmp[1]) > 12) tmp[1] = '12'

  if (Number(tmp[2]) === 0) tmp[2] = '01'
  else if (
    Number(tmp[2]) > 26 &&
    !moment(tmp.join('.'), 'YYYY.MM.DD', true).isValid()
  ) {
    let dt = 31
    let text = `${tmp[0]}.${tmp[1]}.${String(dt)}`
    while (!moment(text, 'YYYY.MM.DD', true).isValid()) {
      dt--
      text = `${tmp[0]}.${tmp[1]}.${String(dt)}`
    }
    tmp[2] = String(dt)
  }
  return new Date(Number(tmp[0]), Number(tmp[1]) - 1, Number(tmp[2]), 0, 0, 0)
}

// Convert integrated formatted string to Date
export const convertToDate = (input: string) => {
  const strings: string[] = input.split(/[- :]/)
  const arr: number[] = strings.map((str) => Number(str))
  return new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5])
}

// Date class object with integrated format
export const getToday = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')

// Add zero for 1 digit number to string
export const makeTwoDigits = (num: number) => {
  return num < 0 ? '00' : num < 10 ? `0${num}` : String(num)
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
  return differenceInTime / (1000 * 3600 * 24)
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
  if (beforeOrAfter) {
    if (beforeOrAfter === 'before') {
      if (month - 1 < 0) {
        return new Date(year - 1, 11, day)
      } else {
        return new Date(year, month - 1, day)
      }
    }
  }
  return new Date(year, month, day)
}

// get appropriate yearMonth
export const getAppropriateYearMonth = (yearMonth: string) => {
  const year = Number(yearMonth.substr(0, 4))
  const month = Number(yearMonth.substr(4, 2)) - 1

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
