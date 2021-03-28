export type MemberType = {
  no: number
  name?: string
  email: string
  attend?: boolean
  assigned?: boolean
}

export type TestDataType = {
  type: 'sub' | 'main'
  parentNo?: number
  parentName?: string
  subNo?: number[]
  no: number
  channel: {
    no: number
    name: string
    color: string
    closed?: boolean
  }
  name: string
  writerNo: number
  writerName: string
  startDate: Date | string
  endDate?: Date | string
  subStartDate?: Date | string
  subEndDate?: Date | string
  members?: Array<MemberType>
  managers?: Array<number>
}

export type TestIconDataType = {
  no: number
  name: string
  date: Date | string
  newCnt?: number
  curMsg?: string
  color?: string
  modTime?: Date | string
  channel?: {
    no: number
    name: string
    closed?: boolean
  }
  writerNo?: number
  writerName?: string
  managers?: Array<number>
  cardName?: string
  done?: boolean
  closed?: boolean
  members?: Array<MemberType>
}

export enum Icons {
  RADIO_CHECKED = 'xi-radiobox-checked',
  RADIO_BLANK = 'xi-radiobox-blank',
  ATTEND = 'xi-emoticon-happy',
  ANGLE_DOWN = 'xi-angle-down',
  ANGLE_UP = 'xi-angle-up',
  ANGLE_LEFT = 'xi-angle-left',
  ANGLE_RIGHT = 'xi-angle-right',
  EMOTICON = 'xi-emoticon',
  CARD = 'xi-view-column',
  MORE = 'xi-ellipsis-h',
  CONFIG = 'xi-cog',
  SWITCH_OFF = 'xi-toggle-off',
  SWITCH_ON = 'xi-toggle-on',
  BELL = 'xi-bell-o',
  POWER = 'xi-power-off',
  FILTER = 'xi-tune',
  FILTER_OPTION = 'xi-filter',
  UNCHECKED = 'xi-checkbox-blank',
  CHECKED = 'xi-check-square-o',
  CLOSE = 'xi-close',
}

export type FilterType = {
  channel: {
    show: boolean
    no?: number
    label?: string
    closed?: boolean
  }
  schedule: {
    show: boolean
    no?: number
    label?: string
  }
  card: {
    show: boolean
    no?: number
    label?: string
    closed?: boolean
  }
  todo: {
    show: boolean
    no?: number
    label?: string
    done?: boolean
  }
  member?: {
    no?: number
    name?: string
    email?: string
    duty?: 'manager' | 'creator' | 'assignee'
  }
}

export type UserType = {
  no: number
  name: string
  email: string
}
