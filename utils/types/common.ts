export enum Icons {
  RADIO_CHECKED = 'xi-radiobox-checked',
  RADIO_BLANK = 'xi-radiobox-blank',
  MISSION = 'xi-check-square-o',
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
}

export type FilterType = {
  channel: {
    show: boolean
    no?: number
    label?: string
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
  }
  todo: {
    show: boolean
    no?: number
    label?: string
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
