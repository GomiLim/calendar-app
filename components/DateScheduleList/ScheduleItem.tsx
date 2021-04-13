import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Recoil from 'recoil'
import { filterState } from '../../recoil'
import ScheduleItemStyle from '../../styles/components/DateScheduleList/ScheduleItemStyle'
import { useIsMounted } from '../../utils/hooks'
import { Icons, MemberType, TestDataType } from '../../utils/types'
import MemberThumbnails from './MemberThumbnails'

interface Props {
  data: TestDataType
  onClick: (data: TestDataType) => void
}

export default function ScheduleItem({ data, onClick }: Props) {
  const { t } = useTranslation()

  const filter = Recoil.useRecoilValue(filterState)

  const [baseMember, setBaseMember] = React.useState<MemberType | undefined>()

  const isMounted = useIsMounted()

  // 우측 사용자 표시에 검색조건에 세팅된 사용자 최우선 표시
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
            .replace(/ /g, '')
            .toLowerCase()
            .indexOf(
              String(member.name).replace(/ /g, '').toLocaleLowerCase(),
            ) > -1 ||
          String(filter.member?.email)
            .replace(/ /g, '')
            .toLowerCase()
            .indexOf(member.email?.replace(/ /g, '').toLocaleLowerCase()) > -1,
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
          backgroundColor: data.channel.color,
          opacity: data.type === 'main' ? 1 : 0.3,
        }}>
        {t(`calendar.${data.type}Schedule`)}
      </div>
      <div style={ScheduleItemStyle.infoContainer}>
        <div style={ScheduleItemStyle.top}>
          <div style={ScheduleItemStyle.mainLabel}>
            {trimName(`#${data.channel.name} > ${data.writerName}`)}
          </div>
          <div style={ScheduleItemStyle.schedule}>
            {moment(data.startDate)
              .format('YY.MM.DD HH:mm')
              .replace(' 00:00', '') +
              (data.endDate &&
              moment(data.startDate).format('YYYYMMDDHHmm') !==
                moment(data.endDate).format('YYYYMMDDHHmm')
                ? `~${moment(data.endDate)
                    .format('YY.MM.DD HH:mm')
                    .replace(' 00:00', '')}`
                : '')}
          </div>
        </div>
        <div style={{ ...ScheduleItemStyle.top, marginTop: '0.5rem' }}>
          <div style={{ width: '70%' }}>
            <div style={ScheduleItemStyle.mainLabelArea}>
              <div style={ScheduleItemStyle.label}>{trimName(data.name)}</div>
            </div>
            {data.type === 'sub' && (
              <div style={ScheduleItemStyle.bottomLabel}>
                {trimName(data.parentName)}
              </div>
            )}
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
