import { useEffect, useState } from 'react'
import { TaskHelper, useFlexSelector } from '@twilio/flex-ui'
import { HeaderContainer, ProfileNameWrapper } from './ProfileNameBubble.styles'

const ProfileNameBubble = props => {
  const [profileName, setProfileName] = useState(null)
  const agentName = props.message.authorName
  const timestamp = new Date(props.message.source.timestamp)

  const task = TaskHelper.getTaskFromConversationSid(props.conversationSid)
  const data = useFlexSelector(
    state =>
      state.flex?.view?.componentViewStates?.['WhatsAppMapData']?.[task.sid]
  )

  useEffect(() => {
    if (data) {
      setProfileName(data.IncomingLocation.ProfileName)
    }
  }, [data])

  return (
    <HeaderContainer>
      <ProfileNameWrapper>{agentName ?? profileName}</ProfileNameWrapper>
      <div>{`${timestamp.getUTCHours()}:${timestamp.getUTCMinutes()}`}</div>
    </HeaderContainer>
  )
}

export default ProfileNameBubble
