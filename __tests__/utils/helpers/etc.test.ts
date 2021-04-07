import * as helper from '../../../utils/helpers'
import { testScheduleData } from '../../../__mocks__/testScheduleData'

describe('helpers 유틸 공통 함수 테스트', () => {
  describe('날짜(YYYY.MM.DD포멧 string) 입력 시 Date 타입 반환', () => {
    context('잘못된 날짜 string 입력 경우', () => {
      it('Null 반환', () => {
        expect(helper.dateValidator('ㄴ독')).toBeNull()
        expect(helper.dateValidator('3434')).toBeNull()
      })
    })
    context('올바른 날짜 string 입력 경우', () => {
      it('Date 타입 반환', () => {
        expect(helper.dateValidator('3111.11.11')).toStrictEqual(
          new Date(3111, 10, 11, 0, 0, 0),
        )
        expect(helper.dateValidator('3434.62.85')).toStrictEqual(
          new Date(3434, 11, 31, 0, 0, 0),
        )
      })
    })
  })
  describe('날짜(YYYY-MM-DD HH:mm:ss포멧 string) 입력 시 Date 타입 반환', () => {
    context('잘못된 날짜 string 입력 경우', () => {
      it('Null 반환', () => {
        expect(helper.convertToDate('ㄴ독')).toBeNull()
        expect(helper.convertToDate('3434')).toBeNull()
        expect(helper.convertToDate('3434.11.22')).toBeNull()
      })
    })
    context('올바른 날짜 string 입력 경우', () => {
      it('Date 타입 반환', () => {
        expect(helper.convertToDate('3111-11-11')).toStrictEqual(
          new Date(3111, 10, 11, 0, 0, 0),
        )
        expect(helper.convertToDate('3434-62-85 23:44:10')).toStrictEqual(
          new Date(3434, 11, 31, 23, 44, 10),
        )
        expect(helper.convertToDate('3434-62-85 235:246:370')).toStrictEqual(
          new Date(3434, 11, 31, 23, 59, 59),
        )
      })
    })
  })
  it('숫자를 무조건 2자리 string 타입으로 반환', () => {
    expect(helper.makeTwoDigits(1)).toBe('01')
    expect(helper.makeTwoDigits(10)).toBe('10')
    expect(helper.makeTwoDigits(100)).toBe('10')
  })
  it('달력일자 ID에서 값 추출', () => {
    const {
      id,
      extractedYear,
      extractedMonth,
      extractedDate,
      disabled,
    } = helper.extractValFromId('1000-00-01:disabled')
    const expectedId = '1000-00-01'
    const expectedYear = '1000'
    const expectedMonth = '00'
    const expectedDate = '01'
    expect(id).toBe(expectedId)
    expect(extractedYear).toBe(expectedYear)
    expect(extractedMonth).toBe(expectedMonth)
    expect(extractedDate).toBe(expectedDate)
    expect(disabled).toBeTruthy()
  })
  it('입력받은 년월을 기준으로 년 반환', () => {
    expect(helper.setYear(2021, -1)).toBe('2020')
    expect(helper.setYear(2021, 12)).toBe('2022')
    expect(helper.setYear(2021, 11)).toBe('2021')
  })
  it('입력받은 월을 기준으로 월 반환', () => {
    expect(helper.setMonth(-1)).toBe('11')
    expect(helper.setMonth(0)).toBe('00')
    expect(helper.setMonth(1715)).toBe('11')
  })
  it('달력 시작 요일 설정값에 따른 현재 일자의 seq 반환', () => {
    expect(helper.getBaseSeq(0, 0)).toBe(0)
    expect(helper.getBaseSeq(1, 0)).toBe(1)
    expect(helper.getBaseSeq(1, 1)).toBe(0)
    expect(helper.getBaseSeq(8, 8)).toBe(0)
    expect(helper.getBaseSeq(8, 9)).toBe(6)
  })
  it('2개의 날짜의 월이 같은지 비교', () => {
    const date1 = new Date()
    const date2 = new Date()
    const date3 = new Date(1000, 11)
    expect(helper.compareMonth(date1, date2)).toBeTruthy()
    expect(helper.compareMonth(date1, date3)).toBeFalsy()
  })
  it('특정 일정 데이터가 특정 월에 속해 있는지 체크', () => {
    // testScheduleData[0] === {
    //   type: 'sub',
    //   parentNo: 2,
    //   no: 1,
    //   channel: {
    //     no: 1,
    //     name: '채널1',
    //     color: theme.palette.main.turquoise,
    //     closed: false,
    //   },
    //   name: '새로운 일정 sub',
    //   writerNo: 1,
    //   writerName: '조인효',
    //   startDate: moment('2021-02-07', 'YYYY-MM-DD').toDate().toJSON(),
    //   endDate: moment('2021-02-09', 'YYYY-MM-DD').toDate().toJSON(),
    //   members: [
    //     { no: 1, email: 'cho.inhyo@rocket.is', name: '조인효', attend: true },
    //   ],
    // }

    expect(
      helper.checkScheduleInMonth(testScheduleData[0], new Date()),
    ).toBeFalsy()
    expect(
      helper.checkScheduleInMonth(testScheduleData[0], new Date(2021, 1, 1)),
    ).toBeTruthy()
  })
  it('기준일자로 화면표시 월 기간 설정', () => {
    const expected = [
      new Date(2021, 0),
      new Date(2021, 1),
      new Date(2021, 2),
      new Date(2021, 3),
      new Date(2021, 4),
    ]
    expect(helper.consistMonthRange(new Date(2021, 2))).toStrictEqual(expected)
    const expected2 = [
      new Date(2020, 10),
      new Date(2020, 11),
      new Date(2021, 0),
      new Date(2021, 1),
      new Date(2021, 2),
    ]
    expect(helper.consistMonthRange(new Date(2021, 0))).toStrictEqual(expected2)
  })
  it('2 일자 비교', () => {
    expect(helper.compareDate(new Date(), new Date())).toBeTruthy()
    expect(helper.compareDate(new Date(), new Date(1000, 0))).toBeFalsy()
  })
  it('2 일자 차이 일 수 계산', () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    expect(helper.getDiffDayCnt(new Date(), yesterday)).toBe(1)
  })
  describe('2 일자 중, 타입에 따라 더 크거나 작은 일자 반환', () => {
    context('start 타입일 시, 더 작은 일자 반환', () => {
      it('일자 반환', () => {
        const expected = new Date()
        expected.setDate(expected.getDate() - 1)
        const unexpected = new Date()
        expect(
          helper.getStartEndDate('start', expected, unexpected),
        ).toStrictEqual(expected)
      })
    })
    context('end 타입일 시, 더 큰 일자 반환', () => {
      it('일자 반환', () => {
        const expected = new Date()
        expected.setDate(expected.getDate() + 1)
        const unexpected = new Date()
        expect(
          helper.getStartEndDate('end', expected, unexpected),
        ).toStrictEqual(expected)
      })
    })
  })
  it('현재 포커스 된 월이 아닌, 이전 월에 해당하는 날짜일 시, 올바른 월 반환', () => {
    const expected = new Date(2021, 1, 28)
    expect(helper.getNewDateUponBefore(2021, 2, 28, true)).toStrictEqual(
      expected,
    )
    expect(helper.getNewDateUponBefore(2021, 1, 28)).toStrictEqual(expected)
  })
  it('올바른 년월 string 값 반환', () => {
    expect(helper.getAppropriateYearMonth('202101')).toBe('202101')
    expect(helper.getAppropriateYearMonth('202100')).toBe('202012')
    expect(helper.getAppropriateYearMonth('202114')).toBe('202202')
    expect(helper.getAppropriateYearMonth('202144')).toBe('')
  })
})
