import React from 'react'
import Thumbnail from '../../foundations/Thumbnail'
import ScheduleItemStyle from '../../styles/components/DateScheduleList/ScheduleItemStyle'
import { MemberType } from '../../utils/types'

interface Props {
  members?: MemberType[]
  baseMember?: MemberType
  theOtherMember?: MemberType
}

export default function MemberThumbnails({
  members,
  baseMember,
  theOtherMember,
}: Props) {
  return (
    <ScheduleItemStyle.thumbnailList>
      {members &&
        (members.length > 2 ? (
          <>
            <Thumbnail
              email={baseMember ? baseMember.email : members[0].email}
              style={ScheduleItemStyle.thumbnail}
            />
            <ScheduleItemStyle.thumbnailMore>
              {`+${members.length - 1}`}
            </ScheduleItemStyle.thumbnailMore>
          </>
        ) : baseMember ? (
          <>
            <Thumbnail
              key={baseMember.no}
              email={baseMember.email}
              style={ScheduleItemStyle.thumbnail}
            />
            {theOtherMember && (
              <Thumbnail
                key={theOtherMember.no}
                email={theOtherMember.email}
                style={ScheduleItemStyle.thumbnail}
              />
            )}
          </>
        ) : (
          members.map((member) => (
            <Thumbnail
              key={member.no}
              email={member.email}
              style={ScheduleItemStyle.thumbnail}
            />
          ))
        ))}
    </ScheduleItemStyle.thumbnailList>
  )
}
