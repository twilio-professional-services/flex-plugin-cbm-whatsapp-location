import { useFlexSelector, TaskHelper } from '@twilio/flex-ui'

const LocationBubble = props => {
  const task = TaskHelper.getTaskFromConversationSid(props.conversationSid)

  const data = useFlexSelector(
    state =>
      state.flex?.view?.componentViewStates?.['WhatsAppMapData']?.[task.sid] ||
      null
  )

  if (data && props.message.source.body === '') {
    return <div>A location was sent by the WhatsApp user</div>
  }

  return null
}

export default LocationBubble
