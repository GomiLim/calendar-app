import { useTranslation } from 'react-i18next'
import Recoil from 'recoil'
import Icon from '../../foundations/Icon'
import Text from '../../foundations/Text'
import Thumbnail from '../../foundations/Thumbnail'
import { sessionState } from '../../recoil/session'
import CalendarHeaderStyle from '../../styles/components/CalendarHeader/CalendarHeaderStyle'
import { Icons } from '../../utils/types'

export default function CalendarHeader() {
  const { t } = useTranslation()

  const session = Recoil.useRecoilValue(sessionState)

  return (
    <CalendarHeaderStyle.container>
      <CalendarHeaderStyle.filterContainer>
        <Text
          value={t('calendar.header.title')}
          style={CalendarHeaderStyle.title}
        />
      </CalendarHeaderStyle.filterContainer>
      <CalendarHeaderStyle.userContainer>
        <Thumbnail
          email={session.email}
          style={CalendarHeaderStyle.thumbnail}
        />
        <Text value={session.name} style={CalendarHeaderStyle.userName} />
        <Icon icon={Icons.CONFIG} style={CalendarHeaderStyle.icon} />
        <Icon icon={Icons.SWITCH_OFF} style={CalendarHeaderStyle.systemIcon} />
        <Icon icon={Icons.BELL} style={CalendarHeaderStyle.systemIcon} />
        <Icon icon={Icons.POWER} style={CalendarHeaderStyle.systemIcon} />
      </CalendarHeaderStyle.userContainer>
    </CalendarHeaderStyle.container>
  )
}
