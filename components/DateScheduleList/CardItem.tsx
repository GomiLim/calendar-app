import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Recoil from 'recoil'
import { filterState } from '../../recoil'
import ScheduleItemStyle from '../../styles/components/DateScheduleList/ScheduleItemStyle'
import theme from '../../styles/theme'
import { useIsMounted } from '../../utils/hooks'
import { Icons, MemberType, TestIconDataType } from '../../utils/types'
import MemberThumbnails from './MemberThumbnails'

interface Props {
  type: string
  data: TestIconDataType
  onClick: (data: TestIconDataType) => void
}

export default function CardItem({ type, data, onClick }: Props) {
  const { t } = useTranslation()

  const filter = Recoil.useRecoilValue(filterState)

  const [baseMember, setBaseMember] = React.useState<MemberType | undefined>()

  const isMounted = useIsMounted()

  React.useEffect(() => {
    if (!isMounted()) return
    if (!data.members) return
    if (data.members.length < 2) return

    if (
      !filter.member ||
      (!filter.member.no && !filter.member.name && !filter.member.email)
    ) {
      setBaseMember(() =>
        data.members && data.members.length > 0 ? data.members[0] : undefined,
      )
    } else {
      const found = data.members.find(
        (member) =>
          filter.member?.no === member.no ||
          String(filter.member?.name)
            .trim()
            .toLowerCase()
            .indexOf(String(member.name).trim().toLocaleLowerCase()) > -1 ||
          String(filter.member?.email)
            .trim()
            .toLowerCase()
            .indexOf(member.email?.trim().toLocaleLowerCase()) > -1,
      )

      setBaseMember(() => found)
    }
  }, [isMounted, filter.member, data.members])

  const trimName = (name?: string) => {
    if (!name) return ''

    const maxLen = 13

    return name.length > maxLen ? (
      <>
        {name.substr(0, maxLen)}
        <i className={Icons.MORE} />
      </>
    ) : (
      name
    )
  }

  return (
    <ScheduleItemStyle.container onClick={() => onClick(data)}>
      <div
        style={{
          ...ScheduleItemStyle.color,
          backgroundColor: data.color || theme.palette.mono.gray,
        }}
      />
      <div style={ScheduleItemStyle.infoContainer}>
        <div style={ScheduleItemStyle.top}>
          <div style={ScheduleItemStyle.mainLabel}>
            {trimName(
              `#${data?.channel?.name || ''} > ${data.writerName || ''}`,
            )}
          </div>
          <div style={ScheduleItemStyle.schedule}>
            {t('calendar.dueto', {
              date: moment(data.date)
                .format('YY.MM.DD HH:mm')
                .replace(' 00:00', ''),
            })}
          </div>
        </div>
        <div style={{ ...ScheduleItemStyle.top, marginTop: '0.5rem' }}>
          <div style={ScheduleItemStyle.mainLabelArea}>
            <div style={ScheduleItemStyle.label}>{trimName(data.name)}</div>
          </div>
          <MemberThumbnails
            members={data.members}
            baseMember={baseMember}
            theOtherMember={
              data.members
                ? data.members.find((member) => member.no !== baseMember?.no)
                : undefined
            }
          />
        </div>
      </div>
    </ScheduleItemStyle.container>
  )
}
